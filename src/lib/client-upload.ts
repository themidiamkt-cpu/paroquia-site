"use client";

import { createImageUploadUrl } from "@/lib/actions";

export async function uploadImageFile(file: File, folder = "uploads") {
    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileType", file.type || "image/jpeg");
    formData.append("fileSize", String(file.size));
    formData.append("folder", folder);

    const uploadData = await createImageUploadUrl(formData);

    const response = await fetch(uploadData.uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type || "image/jpeg",
        },
        body: file,
    });

    if (!response.ok) {
        const responseText = await response.text().catch(() => "");
        console.error("R2 signed upload error:", response.status, responseText);
        throw new Error("Nao foi possivel enviar a imagem para o Cloudflare R2.");
    }

    return uploadData.publicUrl;
}
