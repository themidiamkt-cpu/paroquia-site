import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

const webhookBaseUrl = (
    process.env.FORMS_WEBHOOK_BASE_URL ||
    "https://automacao2.themidiamarketing.com.br/webhook"
).replace(/\/$/, "");

function normalizeSubmissionData(payload: unknown) {
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(payload).map(([key, value]) => [
            key,
            typeof value === "string" ? value.trim() : value == null ? "" : String(value),
        ]),
    );
}

async function forwardToWebhook(formName: string, data: Record<string, string>) {
    const response = await fetch(`${webhookBaseUrl}/${encodeURIComponent(formName)}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
        throw new Error(`Webhook respondeu com status ${response.status}`);
    }
}

export async function POST(
    request: Request,
    { params }: { params: Promise<{ formName: string }> },
) {
    const { formName } = await params;
    const payload = await request.json().catch(() => null);
    const data = normalizeSubmissionData(payload);

    if (!formName || Object.keys(data).length === 0) {
        return NextResponse.json(
            { success: false, error: "Dados do formulário inválidos." },
            { status: 400 },
        );
    }

    let submissionId: number | null = null;
    let savedToDatabase = false;
    let deliveredToWebhook = false;

    const { data: insertedSubmission, error: insertError } = await supabaseAdmin
        .from("form_submissions")
        .insert([{ form_type: formName, data, status: "new" }])
        .select("id")
        .single();

    if (insertError) {
        console.error(`Error saving form submission for ${formName}:`, insertError);
    } else {
        submissionId = insertedSubmission.id;
        savedToDatabase = true;
    }

    try {
        await forwardToWebhook(formName, data);
        deliveredToWebhook = true;
    } catch (error) {
        console.error(`Error forwarding form submission for ${formName}:`, error);
    }

    if (savedToDatabase && submissionId && !deliveredToWebhook) {
        await supabaseAdmin
            .from("form_submissions")
            .update({ status: "webhook_failed" })
            .eq("id", submissionId);
    }

    if (savedToDatabase || deliveredToWebhook) {
        return NextResponse.json({
            success: true,
            warning: deliveredToWebhook
                ? null
                : "Recebemos sua solicitação, mas houve instabilidade no encaminhamento interno.",
        });
    }

    return NextResponse.json(
        {
            success: false,
            error: "Não foi possível enviar sua solicitação agora. Tente novamente em alguns minutos.",
        },
        { status: 500 },
    );
}
