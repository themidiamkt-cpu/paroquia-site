"use client";

import { createImageUploadUrl } from "@/lib/actions";

export async function uploadImageFile(file: File, folder = "uploads") {
    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileType", file.type || "image/jpeg");
    formData.append("fileSize", String(file.size));
    formData.append("folder", folder);

    const uploadData = await createImageUploadUrl(formData);

    if (!uploadData.ok) {
        throw new Error(uploadData.error);
    }

    let response: Response;

    try {
        response = await fetch(uploadData.uploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": file.type || "image/jpeg",
            },
            body: file,
        });
    } catch (error) {
        console.error("R2 signed upload request failed:", error);
        throw new Error("Nao foi possivel enviar a imagem. Verifique a configuracao de CORS do bucket e tente novamente.");
    }

    if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        console.error("R2 signed upload error:", response.status, responseText);
        throw new Error("Cloudflare R2 recusou o upload. Verifique as credenciais e o CORS do bucket.");
    }

    return uploadData.publicUrl;
}
