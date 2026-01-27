"use client";

import { useState, useEffect } from "react";
import { getNotices, createNotice, updateNotice, deleteNotice, uploadImage } from "@/lib/actions";
import { Plus, Trash, Edit, Save, AlertTriangle, Loader2, Upload } from "lucide-react";

interface NoticeItem {
    id: number;
    title: string;
    message: string;
    is_urgent: boolean;
    expires_at: string;
    image_url?: string;
}

export default function AdminAvisosPage() {
    const [notices, setNotices] = useState<NoticeItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<NoticeItem>>({});

    useEffect(() => {
        fetchNotices();
    }, []);

    async function fetchNotices() {
        setLoading(true);
        const data = await getNotices();
        setNotices(data || []);
        setLoading(false);
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "avisos");

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

    async function handleSave() {
        if (!currentItem.title || !currentItem.message) return;

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("message", currentItem.message);
        formData.append("is_urgent", String(currentItem.is_urgent || false));
        formData.append("expires_at", currentItem.expires_at || "");
        formData.append("image_url", currentItem.image_url || "");

        if (currentItem.id) {
            await updateNotice(currentItem.id, formData);
        } else {
            await createNotice(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchNotices();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        await deleteNotice(id);
        fetchNotices();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Avisos</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({}); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Novo Aviso
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Aviso" : "Novo Aviso"}</h2>
                    <div className="space-y-4">
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
                            <label className="block text-sm font-medium mb-1">Mensagem</label>
                            <textarea
                                value={currentItem.message || ""}
                                onChange={e => setCurrentItem({ ...currentItem, message: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Imagem (Opcional)</label>
                            <div className="flex gap-2 items-start">
                                <div className="flex-1">
                                    <label className="flex flex-col items-center px-4 py-4 bg-gray-50 text-gray-500 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition">
                                        {uploading ? (
                                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Enviando...</span>
                                        ) : (
                                            <span className="flex items-center gap-2"><Upload size={18} /> Clique para selecionar uma imagem</span>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                </div>
                                {currentItem.image_url && (
                                    <div className="h-32 w-32 relative border rounded bg-gray-100 overflow-hidden shrink-0">
                                        <img src={currentItem.image_url} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => setCurrentItem({ ...currentItem, image_url: "" })}
                                            className="absolute top-1 right-1 bg-white p-1 rounded-full shadow hover:bg-red-50 text-red-600"
                                        >
                                            <Trash size={12} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mt-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Prioridade</label>
                                <div className="flex gap-4">
                                    <label className="flex items-center cursor-pointer border p-2 rounded hover:bg-gray-50 flex-1">
                                        <input
                                            type="radio"
                                            name="priority"
                                            checked={!currentItem.is_urgent}
                                            onChange={() => setCurrentItem({ ...currentItem, is_urgent: false })}
                                            className="mr-2"
                                        />
                                        <span className="text-sm">Normal</span>
                                    </label>
                                    <label className="flex items-center cursor-pointer border p-2 rounded hover:bg-gray-50 border-red-100 flex-1">
                                        <input
                                            type="radio"
                                            name="priority"
                                            checked={currentItem.is_urgent || false}
                                            onChange={() => setCurrentItem({ ...currentItem, is_urgent: true })}
                                            className="mr-2 text-red-600 focus:ring-red-500"
                                        />
                                        <span className="text-sm font-medium text-red-600 flex items-center gap-1">
                                            <AlertTriangle size={14} /> Alta (Urgente)
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Exibir até (Validade)</label>
                                <input
                                    type="date"
                                    value={currentItem.expires_at ? new Date(currentItem.expires_at).toISOString().slice(0, 10) : ""}
                                    onChange={e => setCurrentItem({ ...currentItem, expires_at: new Date(e.target.value).toISOString() })}
                                    className="w-full p-2 border rounded"
                                />
                                <p className="text-xs text-gray-400 mt-1">O aviso sumirá do site após esta data.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><Save size={18} /> Salvar</button>
                    </div>                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Aviso</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Status</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={3} className="p-6 text-center">Carregando...</td></tr>
                        ) : notices.length === 0 ? (
                            <tr><td colSpan={3} className="p-6 text-center text-gray-500">Nenhum aviso encontrado.</td></tr>
                        ) : (
                            notices.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6">
                                        <div className="font-medium text-gray-800">{item.title}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">{item.message}</div>
                                    </td>
                                    <td className="py-3 px-6">
                                        {item.is_urgent && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                                Urgente
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-6 text-right space-x-2">
                                        <button onClick={() => { setCurrentItem(item); setIsEditing(true); }} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800"><Trash size={18} /></button>
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
