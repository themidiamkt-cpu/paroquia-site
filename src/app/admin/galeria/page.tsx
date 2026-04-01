"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createGallery, deleteGallery, getGalleries, getGallerySetupStatus, updateGallery } from "@/lib/actions";
import { formatDateOnly, getTodayDateInputValue, toDateInputValue } from "@/lib/date";
import { CalendarDays, Edit, ImageIcon, Plus, Save, Trash } from "lucide-react";
import Link from "next/link";

interface Gallery {
    id: number;
    title: string;
    description: string;
    event_date: string | null;
    cover_image: string | null;
}

export default function AdminGaleriaPage() {
    const router = useRouter();
    const [galleries, setGalleries] = useState<Gallery[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<Gallery>>({});
    const [setupMessage, setSetupMessage] = useState<string | null>(null);

    useEffect(() => {
        fetchGalleries();
    }, []);

    async function fetchGalleries() {
        setLoading(true);
        const status = await getGallerySetupStatus();

        if (!status.ready) {
            setSetupMessage(status.message);
            setGalleries([]);
            setLoading(false);
            return;
        }

        setSetupMessage(null);
        const data = await getGalleries();
        setGalleries((data || []) as Gallery[]);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.title?.trim()) {
            alert("Informe o nome do evento.");
            return;
        }

        setSaving(true);

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("description", currentItem.description || "");
        formData.append("event_date", currentItem.event_date || getTodayDateInputValue());

        try {
            if (currentItem.id) {
                await updateGallery(currentItem.id, formData);
                setIsEditing(false);
                setCurrentItem({});
                await fetchGalleries();
                return;
            }

            const createdGallery = await createGallery(formData);

            if (createdGallery?.id) {
                router.push(`/admin/galeria/${createdGallery.id}`);
                return;
            }

            setIsEditing(false);
            setCurrentItem({});
            await fetchGalleries();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Nao foi possivel salvar o evento da galeria.");
            await fetchGalleries();
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir este evento? Todas as fotos serão removidas.")) return;
        try {
            await deleteGallery(id);
            await fetchGalleries();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Nao foi possivel excluir o evento.");
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Galeria de Eventos</h1>
                    <p className="text-sm text-gray-500 mt-1">Crie um evento, envie várias fotos e escolha a capa do álbum.</p>
                </div>

                <button
                    onClick={() => {
                        setIsEditing(true);
                        setCurrentItem({ event_date: getTodayDateInputValue() });
                    }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Novo Evento
                </button>
            </div>

            {setupMessage && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {setupMessage}
                </div>
            )}

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Evento" : "Novo Evento da Galeria"}</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Nome do Evento</label>
                            <input
                                type="text"
                                value={currentItem.title || ""}
                                onChange={(e) => setCurrentItem({ ...currentItem, title: e.target.value })}
                                className="w-full p-2 border rounded"
                                placeholder="Ex.: Festa do Padroeiro 2026"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Data</label>
                            <input
                                type="date"
                                value={toDateInputValue(currentItem.event_date)}
                                onChange={(e) => setCurrentItem({ ...currentItem, event_date: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea
                                value={currentItem.description || ""}
                                onChange={(e) => setCurrentItem({ ...currentItem, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                rows={4}
                                placeholder="Resumo do evento ou contexto das fotos."
                            />
                        </div>
                    </div>

                    <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                        As fotos e a imagem de capa são gerenciadas na próxima tela. A primeira foto enviada vira a capa automaticamente, e depois você pode trocar com um clique.
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            onClick={() => {
                                setIsEditing(false);
                                setCurrentItem({});
                            }}
                            className="px-4 py-2 border rounded hover:bg-gray-50"
                            disabled={saving}
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save size={18} /> {saving ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 text-center py-12 text-gray-500">Carregando eventos...</div>
                ) : galleries.length === 0 ? (
                    <div className="col-span-3 text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-200">
                        Nenhum evento cadastrado. Clique em &quot;Novo Evento&quot; para começar.
                    </div>
                ) : (
                    galleries.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                            <div className="h-52 bg-gray-100 relative">
                                {item.cover_image ? (
                                    <img src={item.cover_image} alt={item.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
                                        <ImageIcon size={40} />
                                        <span className="text-sm">Sem capa definida</span>
                                    </div>
                                )}

                                <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 flex items-center gap-1">
                                    <CalendarDays size={12} />
                                    {item.event_date ? formatDateOnly(item.event_date) : "Data não informada"}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                <p className="text-sm text-gray-500 mt-2 line-clamp-3 min-h-[60px]">
                                    {item.description || "Sem descrição cadastrada."}
                                </p>

                                <div className="mt-5 flex items-center justify-between gap-3">
                                    <Link
                                        href={`/admin/galeria/${item.id}`}
                                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                                    >
                                        <ImageIcon size={16} /> Gerenciar Fotos
                                    </Link>

                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => {
                                                setCurrentItem(item);
                                                setIsEditing(true);
                                            }}
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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
