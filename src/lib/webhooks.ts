
export async function sendToWebhook(formName: string, data: any) {
    const webhookBaseUrl = "https://automacao2.themidiamarketing.com.br/webhook";
    const url = `${webhookBaseUrl}/${formName}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`Failed to send to webhook ${formName}:`, response.statusText);
            // We might want to throw here or return success: false
            return { success: false, error: response.statusText };
        }

        return { success: true };
    } catch (error) {
        console.error(`Error sending to webhook ${formName}:`, error);
        return { success: false, error: error };
    }
}
