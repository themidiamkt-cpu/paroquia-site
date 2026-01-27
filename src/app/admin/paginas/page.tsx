"use client";

import { useState, useEffect } from "react";
import { getPages, createPage, updatePage } from "@/lib/actions";
import { Plus, Edit, Save, BookOpen, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

interface PageItem {
    id: number;
    title: string;
    slug: string;
    content: string;
    updated_at: string;
}

export default function AdminPagesPage() {
    const [pages, setPages] = useState<PageItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<PageItem>>({});

    useEffect(() => {
        fetchPages();
    }, []);

    async function fetchPages() {
        setLoading(true);
        const data = await getPages();
        setPages(data || []);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.title || !currentItem.slug) {
            alert("Título e Slug são obrigatórios.");
            return;
        }

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("slug", currentItem.slug);
        formData.append("content", currentItem.content || "");

        if (currentItem.id) {
            await updatePage(currentItem.id, formData);
        } else {
            await createPage(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchPages();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Páginas</h1>
                <div className="flex gap-2">
                    <button
                        onClick={fetchPages}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition"
                        title="Atualizar lista"
                    >
                        <RefreshCw size={18} />
                    </button>
                    <button
                        onClick={() => { setIsEditing(true); setCurrentItem({}); }}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        <Plus size={18} /> Nova Página
                    </button>
                </div>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 w-full max-w-4xl mx-auto">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Conteúdo" : "Nova Página"}</h2>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <input
                                    type="text"
                                    value={currentItem.title || ""}
                                    onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Ex: A Paróquia"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (URL)</label>
                                <input
                                    type="text"
                                    value={currentItem.slug || ""}
                                    onChange={e => setCurrentItem({ ...currentItem, slug: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    placeholder="Ex: a-paroquia"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Conteúdo (HTML)</label>
                            <p className="text-xs text-gray-500 mb-2">
                                Use tags HTML para formatar o texto. Ex: &lt;p&gt;Texto&lt;/p&gt;, &lt;strong&gt;Negrito&lt;/strong&gt;, &lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;
                            </p>
                            <textarea
                                value={currentItem.content || ""}
                                onChange={e => setCurrentItem({ ...currentItem, content: e.target.value })}
                                className="w-full p-3 border rounded font-mono text-sm h-96"
                                placeholder="<p>Escreva o conteúdo aqui...</p>"
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Título</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Slug / URL</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Última Atualização</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center">Carregando...</td></tr>
                        ) : pages.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Nenhuma página encontrada.</td></tr>
                        ) : (
                            pages.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 font-medium flex items-center gap-2">
                                        <BookOpen size={16} className="text-gray-400" />
                                        {item.title}
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-500">
                                        <span className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">/{item.slug}</span>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-500">
                                        {item.updated_at ? new Date(item.updated_at).toLocaleDateString() : '-'}
                                    </td>
                                    <td className="py-3 px-6 text-right space-x-2">
                                        <Link
                                            href={`/${item.slug}`}
                                            target="_blank"
                                            className="inline-block text-gray-400 hover:text-gray-600"
                                            title="Ver no site"
                                        >
                                            <ExternalLink size={18} />
                                        </Link>
                                        <button
                                            onClick={() => { setCurrentItem(item); setIsEditing(true); }}
                                            className="text-blue-600 hover:text-blue-800"
                                            title="Editar"
                                        >
                                            <Edit size={18} />
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
