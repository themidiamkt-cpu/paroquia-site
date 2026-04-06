import { NextResponse } from "next/server";

import { getR2Object, toWebReadableStream } from "@/lib/r2";

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ key: string[] }> },
) {
    const { key } = await params;

    if (!Array.isArray(key) || key.length === 0) {
        return NextResponse.json({ error: "Arquivo nao informado." }, { status: 400 });
    }

    const objectKey = key.map((segment) => decodeURIComponent(segment)).join("/");

    try {
        const object = await getR2Object(objectKey);
        const stream = toWebReadableStream(object.Body);

        if (!stream) {
            return NextResponse.json({ error: "Arquivo sem conteudo." }, { status: 404 });
        }

        const headers = new Headers();

        headers.set("Cache-Control", object.CacheControl || "public, max-age=31536000, immutable");

        if (object.ContentType) {
            headers.set("Content-Type", object.ContentType);
        }

        if (typeof object.ContentLength === "number") {
            headers.set("Content-Length", String(object.ContentLength));
        }

        if (object.ETag) {
            headers.set("ETag", object.ETag);
        }

        if (object.LastModified) {
            headers.set("Last-Modified", object.LastModified.toUTCString());
        }

        return new Response(stream, {
            status: 200,
            headers,
        });
    } catch (error) {
        console.error("R2 object fetch error:", error);

        return NextResponse.json(
            { error: "Nao foi possivel carregar a imagem." },
            { status: 404 },
        );
    }
}
