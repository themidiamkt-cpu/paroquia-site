"use client";

import { useState, useEffect } from "react";
import { getGalleryImages, createGalleryImage, deleteGalleryImage, updateGalleryImageOrder } from "@/lib/actions";
import { Plus, Trash, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react"; // Explicit import for React

interface GalleryImage {
    id: number;
    gallery_id: number;
    image_url: string;
    display_order: number;
    created_at: string;
}

export default function AdminGalleryImagesPage() {
    const params = useParams();
    const router = useRouter();
    // Unwrap params.id properly. In Next.js client components, params might be string or string[].
    const galleryId = params?.id ? Number(params.id) : null;

    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (galleryId) {
            fetchImages();
        }
    }, [galleryId]);

    async function fetchImages() {
        if (!galleryId) return;
        setLoading(true);
        const data = await getGalleryImages(galleryId);
        setImages(data || []);
        setLoading(false);
    }

    async function handleAddImage() {
        if (!newImageUrl || !galleryId) return;

        const formData = new FormData();
        formData.append("gallery_id", String(galleryId));
        formData.append("image_url", newImageUrl);
        // Default order to end of list
        const maxOrder = images.length > 0 ? Math.max(...images.map(i => i.display_order)) : 0;
        formData.append("display_order", String(maxOrder + 1));

        await createGalleryImage(formData);

        setNewImageUrl("");
        setIsAdding(false);
        fetchImages();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja remover esta foto?")) return;
        await deleteGalleryImage(id);
        fetchImages();
    }

    async function handleUpdateOrder(id: number, newOrder: number) {
        await updateGalleryImageOrder(id, newOrder);
        // Optimistic update locally
        const updatedImages = images.map(img => img.id === id ? { ...img, display_order: newOrder } : img);
        updatedImages.sort((a, b) => a.display_order - b.display_order);
        setImages(updatedImages);
    }

    if (!galleryId) return <div className="p-8 text-center">Galeria não encontrada.</div>;

    return (
        <div>
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/galeria" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Fotos</h1>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <h2 className="font-bold mb-4 text-gray-700">Adicionar Nova Foto</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        value={newImageUrl}
                        onChange={e => setNewImageUrl(e.target.value)}
                        placeholder="Cole a URL da imagem aqui (https://...)"
                        className="flex-1 p-2 border rounded"
                        onKeyDown={e => e.key === 'Enter' && handleAddImage()}
                    />
                    <button
                        onClick={handleAddImage}
                        disabled={!newImageUrl}
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Plus size={18} /> Adicionar
                    </button>
                </div>
                <p className="text-xs text-gray-400 mt-2">Dica: Você pode copiar URLs de imagens do Google Photos, Drive, ou qualquer host de imagens.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <h3 className="font-bold mb-4 text-gray-700">Fotos da Galeria ({images.length})</h3>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Carregando fotos...</div>
                ) : images.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        Nenhuma foto adicionada ainda.
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {images.map((img) => (
                            <div key={img.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={img.image_url}
                                    alt="Galeria"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300?text=Erro+Imagem'; }}
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center p-2">
                                    <button
                                        onClick={() => handleDelete(img.id)}
                                        className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition mb-2"
                                        title="Excluir imagem"
                                    >
                                        <Trash size={16} />
                                    </button>
                                    <div className="flex items-center gap-1 bg-white/90 p-1 rounded">
                                        <span className="text-xs font-bold text-gray-600">Ordem:</span>
                                        <input
                                            type="number"
                                            className="w-12 text-center text-xs p-1 border rounded"
                                            value={img.display_order}
                                            onChange={(e) => handleUpdateOrder(img.id, Number(e.target.value))}
                                            onClick={(e) => e.stopPropagation()}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
