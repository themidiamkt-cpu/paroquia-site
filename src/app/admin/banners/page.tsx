"use client";

import { useState, useEffect } from "react";
import { getBanners, createBanner, updateBanner, deleteBanner, uploadImage } from "@/lib/actions";
import { Plus, Trash, Edit, Save, X, Image as ImageIcon, Loader2, Upload } from "lucide-react";

interface Banner {
    id: number;
    title: string;
    image_url: string;
    link: string;
    desktop_order: number;
    mobile_order: number;
    active: boolean;
}

export default function AdminBannersPage() {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Banner>>({});

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "banners");

        try {
            const url = await uploadImage(formData);
            setCurrentItem(prev => ({ ...prev, image_url: url }));
        } catch (error) {
            console.error("Upload failed", error);
            alert("Erro ao enviar imagem. Verifique se o arquivo é válido.");
        } finally {
            setUploading(false);
        }
    }

    useEffect(() => {
        fetchBanners();
    }, []);

    async function fetchBanners() {
        setLoading(true);
        const data = await getBanners();
        setBanners(data || []);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.title || !currentItem.image_url) {
            alert("Título e URL da imagem são obrigatórios.");
            return;
        }

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("image_url", currentItem.image_url);
        formData.append("link", currentItem.link || "");
        formData.append("desktop_order", String(currentItem.desktop_order || 0));
        formData.append("mobile_order", String(currentItem.mobile_order || 0));
        formData.append("active", String(currentItem.active ?? true));

        if (currentItem.id) {
            await updateBanner(currentItem.id, formData);
        } else {
            await createBanner(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchBanners();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir este banner?")) return;
        await deleteBanner(id);
        fetchBanners();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Banners</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({ active: true, desktop_order: 0 }); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Novo Banner
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Banner" : "Novo Banner"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Título (Interno)</label>
                            <input
                                type="text"
                                value={currentItem.title || ""}
                                onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })}
                                className="w-full p-2 border rounded"
                                placeholder="Ex: Campanha de Natal"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Imagem do Banner</label>
                            <div className="flex items-center gap-4">
                                {currentItem.image_url && (
                                    <div className="relative w-48 h-16 rounded-lg overflow-hidden border border-gray-200">
                                        <img src={currentItem.image_url} alt="Preview" className="w-full h-full object-cover" />
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
                            <p className="text-xs text-gray-500 mt-1">Recomendado: 1920x600px</p>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Link (Opcional)</label>
                            <input
                                type="text"
                                value={currentItem.link || ""}
                                onChange={e => setCurrentItem({ ...currentItem, link: e.target.value })}
                                className="w-full p-2 border rounded"
                                placeholder="Ex: /noticias/natal"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Ordem</label>
                            <input
                                type="number"
                                value={currentItem.desktop_order || 0}
                                onChange={e => setCurrentItem({ ...currentItem, desktop_order: Number(e.target.value) })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="flex items-center pt-6">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={currentItem.active ?? true}
                                    onChange={e => setCurrentItem({ ...currentItem, active: e.target.checked })}
                                    className="mr-2 h-4 w-4"
                                />
                                <span className="text-sm font-medium">Ativo</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
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
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Imagem</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Título</th>
                            <th className="text-center py-3 px-6 font-semibold text-gray-600">Ordem</th>
                            <th className="text-center py-3 px-6 font-semibold text-gray-600">Status</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={5} className="p-6 text-center">Carregando...</td></tr>
                        ) : banners.length === 0 ? (
                            <tr><td colSpan={5} className="p-6 text-center text-gray-500">Nenhum banner cadastrado.</td></tr>
                        ) : (
                            banners.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6">
                                        <div className="h-10 w-24 bg-gray-200 rounded overflow-hidden relative">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-gray-400"><ImageIcon size={16} /></div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 font-medium">{item.title}</td>
                                    <td className="py-3 px-6 text-center">{item.desktop_order}</td>
                                    <td className="py-3 px-6 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {item.active ? 'Ativo' : 'Inativo'}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-right space-x-2">
                                        <button
                                            onClick={() => { setCurrentItem(item); setIsEditing(true); }}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
