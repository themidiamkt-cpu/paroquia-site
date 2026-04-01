
export async function sendToWebhook(formName: string, data: Record<string, string>) {
    try {
        const response = await fetch(`/api/forms/${encodeURIComponent(formName)}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage = result?.error || `Erro ${response.status}`;
            console.error(`Failed to submit form ${formName}:`, errorMessage);
            return { success: false, error: errorMessage };
        }

        if (!result?.success) {
            const errorMessage = result?.error || "Falha ao enviar formulário.";
            console.error(`Form submission returned failure for ${formName}:`, errorMessage);
            return { success: false, error: errorMessage };
        }

        return { success: true, warning: result.warning };
    } catch (error) {
        console.error(`Error submitting form ${formName}:`, error);
        return { success: false, error: "Não foi possível enviar sua solicitação no momento." };
    }
}
