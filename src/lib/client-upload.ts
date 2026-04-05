"use client";

import { createImageUploadUrl } from "@/lib/actions";
import { supabase } from "@/lib/supabase";

export async function uploadImageFile(file: File, folder = "uploads") {
    const formData = new FormData();
    formData.append("fileName", file.name);
    formData.append("fileType", file.type || "image/jpeg");
    formData.append("fileSize", String(file.size));
    formData.append("folder", folder);

    const uploadData = await createImageUploadUrl(formData);

    const { error } = await supabase.storage
        .from(uploadData.bucket)
        .uploadToSignedUrl(uploadData.path, uploadData.token, file, {
            contentType: file.type || "image/jpeg",
            upsert: false,
        });

    if (error) {
        console.error("Supabase client signed upload error:", error);
        throw new Error(error.message || "Nao foi possivel enviar a imagem.");
    }

    return uploadData.publicUrl;
}
