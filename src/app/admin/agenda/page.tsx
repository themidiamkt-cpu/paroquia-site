"use client";

import { useState, useEffect } from "react";
import { getEvents, createEvent, updateEvent, deleteEvent } from "@/lib/actions";
import { Plus, Trash, Edit, Save } from "lucide-react";

interface EventItem {
    id: number;
    title: string;
    description: string;
    event_date: string;
    location: string;
}

export default function AdminAgendaPage() {
    const [events, setEvents] = useState<EventItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<EventItem>>({});

    useEffect(() => {
        fetchEvents();
    }, []);

    async function fetchEvents() {
        setLoading(true);
        const data = await getEvents();
        setEvents(data || []);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.title || !currentItem.event_date) return;

        const formData = new FormData();
        formData.append("title", currentItem.title);
        formData.append("description", currentItem.description || "");
        formData.append("event_date", currentItem.event_date);
        formData.append("location", currentItem.location || "");

        if (currentItem.id) {
            await updateEvent(currentItem.id, formData);
        } else {
            await createEvent(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchEvents();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        await deleteEvent(id);
        fetchEvents();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Agenda</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({}); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Novo Evento
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Evento" : "Novo Evento"}</h2>
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
                            <label className="block text-sm font-medium mb-1">Data e Hora</label>
                            <input
                                type="datetime-local"
                                value={currentItem.event_date ? new Date(currentItem.event_date).toISOString().slice(0, 16) : ""}
                                onChange={e => setCurrentItem({ ...currentItem, event_date: new Date(e.target.value).toISOString() })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Local</label>
                            <input
                                type="text"
                                value={currentItem.location || ""}
                                onChange={e => setCurrentItem({ ...currentItem, location: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
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
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Data</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Evento</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Local</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center">Carregando...</td></tr>
                        ) : events.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Nenhum evento encontrado.</td></tr>
                        ) : (
                            events.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 text-sm text-gray-500">{new Date(item.event_date).toLocaleDateString()} {new Date(item.event_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className="py-3 px-6 font-medium">{item.title}</td>
                                    <td className="py-3 px-6 text-sm text-gray-500">{item.location}</td>
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
