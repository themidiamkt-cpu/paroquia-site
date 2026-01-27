"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCommunity, uploadImage } from "@/lib/actions";
import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NovaComunidadePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
        image_url: ""
    });

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("folder", "comunidades");

            const url = await uploadImage(data);
            setFormData({ ...formData, image_url: url || "" });
        } catch (error) {
            console.error("Erro ao fazer upload:", error);
            alert("Erro ao fazer upload da imagem.");
        } finally {
            setUploading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("address", formData.address);
            data.append("description", formData.description);
            data.append("image_url", formData.image_url);

            await createCommunity(data);
            router.push("/admin/comunidades");
        } catch (error) {
            console.error("Erro ao criar comunidade:", error);
            alert("Erro ao criar comunidade.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/comunidades" className="text-gray-500 hover:text-gray-700">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Nova Comunidade</h1>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Comunidade *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                placeholder="Ex: Capela São José"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço *</label>
                            <input
                                type="text"
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                placeholder="Rua, Número, Bairro"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                            <textarea
                                rows={4}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                placeholder="Breve descrição da comunidade..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Imagem da Comunidade</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 relative overflow-hidden group">
                            {formData.image_url ? (
                                <>
                                    <Image
                                        src={formData.image_url}
                                        alt="Preview"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <p className="text-white font-medium">Clique para alterar</p>
                                    </div>
                                </>
                            ) : (
                                <div className="text-center text-gray-500">
                                    {uploading ? (
                                        <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                                    ) : (
                                        <Upload className="mx-auto mb-2" size={24} />
                                    )}
                                    <p className="text-sm">Clique para fazer upload</p>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                disabled={uploading}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-center">Recomendado: 800x600px (JPG, PNG)</p>
                    </div>
                </div>

                <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                    <Link
                        href="/admin/comunidades"
                        className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition"
                    >
                        Cancelar
                    </Link>
                    <button
                        type="submit"
                        disabled={loading || uploading}
                        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                        Salvar Comunidade
                    </button>
                </div>
            </form>
        </div>
    );
}
