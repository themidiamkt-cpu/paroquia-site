"use client";

import { useState, useEffect } from "react";
import { getGalleries, createGallery, updateGallery, deleteGallery, uploadImage } from "@/lib/actions";
import { Plus, Trash, Edit, Save, ImageIcon, ExternalLink, Loader2, Upload } from "lucide-react";
import Link from "next/link";

interface Gallery {
    id: number;
    title: string;
    description: string;
    event_date: string;
    cover_image: string;
}

export default function AdminGaleriaPage() {
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Gallery>>({});

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "galeria");

        try {
            const url = await uploadImage(formData);
            setCurrentItem(prev => ({ ...prev, cover_image: url }));
        } catch (error) {
            console.error("Upload failed", error);
            alert("Erro ao enviar imagem. Verifique se o arquivo é válido.");
        } finally {
            setUploading(false);
        }
    }

    useEffect(() => {
        fetchGalleries();
    }, []);

    async function fetchGalleries() {
        setLoading(true);
        const data = await getGalleries();
        setGalleries(data || []);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.title) {
            alert("Título é obrigatório.");
            return;
        }

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("description", currentItem.description || "");
        formData.append("event_date", currentItem.event_date || new Date().toISOString().split('T')[0]);
        formData.append("cover_image", currentItem.cover_image || "");

        if (currentItem.id) {
            await updateGallery(currentItem.id, formData);
        } else {
            await createGallery(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchGalleries();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir esta galeria? Todas as fotos serão perdidas.")) return;
        await deleteGallery(id);
        fetchGalleries();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Galerias</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({ event_date: new Date().toISOString().split('T')[0] }); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Nova Galeria
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Galeria" : "Nova Galeria"}</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <input
                                    type="text"
                                    value={currentItem.title || ""}
                                    onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Data do Evento</label>
                                <input
                                    type="date"
                                    value={currentItem.event_date ? currentItem.event_date.split('T')[0] : ""}
                                    onChange={e => setCurrentItem({ ...currentItem, event_date: e.target.value })}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Imagem de Capa</label>
                            <div className="flex items-center gap-4">
                                {currentItem.cover_image && (
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={currentItem.cover_image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    {uploading ? <Loader2 size={18} className="animate-spin text-gray-500" /> : <Upload size={18} className="text-gray-500" />}
                                    <span className="text-sm text-gray-600">{uploading ? "Enviando..." : "Escolher Imagem"}</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea
                                value={currentItem.description || ""}
                                onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 border rounded hover:bg-gray-50"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
                            >
                                <Save size={18} /> Salvar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center py-12 text-gray-500">Carregando galerias...</div>
                ) : galleries.length === 0 ? (
                    <div className="col-span-3 text-center py-12 text-gray-500">
                        Nenhuma galeria encontrada. Clique em "Nova Galeria" para começar.
                    </div>
                ) : (
                    galleries.map(item => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                            <div className="h-48 bg-gray-200 relative">
                                {item.cover_image ? (
                                    <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                    <Link
                                        href={`/admin/galeria/${item.id}`}
                                        className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 flex items-center gap-2"
                                    >
                                        <ImageIcon size={16} /> Gerenciar Fotos
                                    </Link>
                                </div>
                            </div>
                            <div className="p-4">
                                <h3 className="font-bold text-gray-800 truncate" title={item.title}>{item.title}</h3>
                                <p className="text-sm text-gray-500 mb-4">{new Date(item.event_date).toLocaleDateString()}</p>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => { setCurrentItem(item); setIsEditing(true); }}
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                    >
                                        <Edit size={14} /> Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-800 text-sm flex items-center gap-1"
                                    >
                                        <Trash size={14} /> Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
