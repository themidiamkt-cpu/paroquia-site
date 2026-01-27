"use client";

import { useState, useEffect } from "react";
import { getSchedules, createSchedule, updateSchedule, deleteSchedule } from "@/lib/actions";
import { Plus, Trash, Edit, Save } from "lucide-react";

interface ScheduleItem {
    id: number;
    day_of_week: string;
    time: string;
    description: string;
    type: string;
}

export default function AdminHorariosPage() {
    const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<ScheduleItem>>({});

    useEffect(() => {
        fetchSchedules();
    }, []);

    async function fetchSchedules() {
        setLoading(true);
        const data = await getSchedules();
        setSchedules(data || []);
        setLoading(false);
    }

    async function handleSave() {
        if (!currentItem.day_of_week || !currentItem.time) return;

        const formData = new FormData();
        formData.append("day_of_week", currentItem.day_of_week);
        formData.append("time", currentItem.time);
        formData.append("description", currentItem.description || "");
        formData.append("type", currentItem.type || 'missa');

        if (currentItem.id) {
            await updateSchedule(currentItem.id, formData);
        } else {
            await createSchedule(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchSchedules();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        await deleteSchedule(id);
        fetchSchedules();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Horários</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({}); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Novo Horário
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Horário" : "Novo Horário"}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Dia da Semana</label>
                            <select
                                value={currentItem.day_of_week || ""}
                                onChange={e => setCurrentItem({ ...currentItem, day_of_week: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Selecione...</option>
                                <option value="Segunda-feira">Segunda-feira</option>
                                <option value="Terça-feira">Terça-feira</option>
                                <option value="Quarta-feira">Quarta-feira</option>
                                <option value="Quinta-feira">Quinta-feira</option>
                                <option value="Sexta-feira">Sexta-feira</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Horário</label>
                            <input
                                type="time"
                                value={currentItem.time || ""}
                                onChange={e => setCurrentItem({ ...currentItem, time: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tipo</label>
                            <select
                                value={currentItem.type || "missa"}
                                onChange={e => setCurrentItem({ ...currentItem, type: e.target.value })}
                                className="w-full p-2 border rounded"
                            >
                                <option value="missa">Missa</option>
                                <option value="confissao">Confissão</option>
                                <option value="secretaria">Secretaria</option>
                                <option value="atendimento">Atendimento Padre</option>
                                <option value="evento">Outro</option>
                            </select>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <input
                                type="text"
                                value={currentItem.description || ""}
                                onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })}
                                className="w-full p-2 border rounded"
                                placeholder="Ex: Com Novena..."
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
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Dia</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Horário</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Descrição</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center">Carregando...</td></tr>
                        ) : schedules.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Nenhum horário cadastrado.</td></tr>
                        ) : (
                            schedules.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 font-medium text-primary">{item.day_of_week}</td>
                                    <td className="py-3 px-6 font-bold">{item.time.slice(0, 5)}</td>
                                    <td className="py-3 px-6 text-sm text-gray-600">{item.description} <span className="text-xs px-2 py-1 bg-gray-100 rounded-full ml-2">{item.type}</span></td>
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
