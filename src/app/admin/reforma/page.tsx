"use client";

import { useState, useEffect } from "react";
import { getReformUpdates, createReformUpdate, updateReformUpdate, deleteReformUpdate, uploadImage } from "@/lib/actions";
import { Plus, Trash, Edit, Save, Loader2, Upload, ImageIcon } from "lucide-react";

interface ReformUpdateItem {
    id: number;
    title: string;
    description: string;
    percent_complete: number;
    stage: string;
    image_url?: string;
    created_at: string;
}

export default function AdminReformaPage() {
    const [updates, setUpdates] = useState<ReformUpdateItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<ReformUpdateItem>>({});

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "reforma");

        try {
            const url = await uploadImage(formData);
            setCurrentItem(prev => ({ ...prev, image_url: url }));
        } catch (error: any) {
            console.error("Upload failed", error);
            alert(`Erro: ${error?.message || 'Falha no upload'}`);
        } finally {
            setUploading(false);
        }
    }

    useEffect(() => {
        fetchUpdates();
    }, []);

    async function fetchUpdates() {
        setLoading(true);
        const data = await getReformUpdates();
        setUpdates(data || []);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.title) return;

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("description", currentItem.description || "");
        formData.append("percent_complete", String(currentItem.percent_complete || 0));
        formData.append("stage", currentItem.stage || 'Em andamento');
        formData.append("image_url", currentItem.image_url || "");

        if (currentItem.id) {
            await updateReformUpdate(currentItem.id, formData);
        } else {
            await createReformUpdate(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchUpdates();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        await deleteReformUpdate(id);
        fetchUpdates();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Reforma</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({}); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Nova Atualização
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Atualização" : "Nova Atualização"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Título</label>
                            <input
                                type="text"
                                value={currentItem.title || ""}
                                onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Etapa</label>
                            <select
                                value={currentItem.stage || ""}
                                onChange={e => setCurrentItem({ ...currentItem, stage: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Selecione...</option>
                                <option value="Planejamento">Planejamento</option>
                                <option value="Fundação">Fundação</option>
                                <option value="Estrutura">Estrutura</option>
                                <option value="Alvenaria">Alvenaria</option>
                                <option value="Cobertura">Cobertura</option>
                                <option value="Acabamento">Acabamento</option>
                                <option value="Finalização">Finalização</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Progresso (%)</label>
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={currentItem.percent_complete || 0}
                                onChange={e => setCurrentItem({ ...currentItem, percent_complete: Number(e.target.value) })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Imagem</label>
                            <div className="flex items-center gap-4">
                                {currentItem.image_url && (
                                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
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
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea
                                value={currentItem.description || ""}
                                onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={3}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><Save size={18} /> Salvar</button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Atualização</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Progresso</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={3} className="p-6 text-center">Carregando...</td></tr>
                        ) : updates.length === 0 ? (
                            <tr><td colSpan={3} className="p-6 text-center text-gray-500">Nenhuma atualização encontrada.</td></tr>
                        ) : (
                            updates.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6">
                                        <div className="font-bold text-gray-800">{item.title}</div>
                                        <div className="text-xs text-secondary font-bold uppercase tracking-wider mb-1">{item.stage}</div>
                                        <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                                    </td>
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-green-500" style={{ width: `${item.percent_complete}%` }}></div>
                                            </div>
                                            <span className="text-sm font-medium">{item.percent_complete}%</span>
                                        </div>
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
