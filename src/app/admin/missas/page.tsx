"use client";

import { useState, useEffect } from "react";
import { getAllMassSchedules, createMassSchedule, updateMassSchedule, deleteMassSchedule } from "@/lib/actions";
import { Plus, Edit2, Trash2, Save, X, Clock, ChurchIcon } from "lucide-react";

interface MassSchedule {
    id: number;
    day_of_week: number;
    time: string;
    title: string;
    description: string;
    location: string;
    is_active: boolean;
}

const DAYS_OF_WEEK = [
    { value: 0, label: "Domingo" },
    { value: 1, label: "Segunda-feira" },
    { value: 2, label: "Terça-feira" },
    { value: 3, label: "Quarta-feira" },
    { value: 4, label: "Quinta-feira" },
    { value: 5, label: "Sexta-feira" },
    { value: 6, label: "Sábado" },
];

export default function AdminMissasPage() {
    const [schedules, setSchedules] = useState<MassSchedule[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        day_of_week: 0,
        time: "",
        title: "",
        description: "",
        location: "Igreja Matriz",
        is_active: true,
    });

    useEffect(() => {
        fetchSchedules();
    }, []);

    async function fetchSchedules() {
        setLoading(true);
        const data = await getAllMassSchedules();
        setSchedules(data || []);
        setLoading(false);
    }

    const resetForm = () => {
        setFormData({
            day_of_week: 0,
            time: "",
            title: "",
            description: "",
            location: "Igreja Matriz",
            is_active: true,
        });
        setEditingId(null);
        setShowForm(false);
    };

    const handleEdit = (schedule: MassSchedule) => {
        setFormData({
            day_of_week: schedule.day_of_week,
            time: schedule.time,
            title: schedule.title,
            description: schedule.description || "",
            location: schedule.location || "Igreja Matriz",
            is_active: schedule.is_active,
        });
        setEditingId(schedule.id);
        setShowForm(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fd = new FormData();
        fd.set("day_of_week", String(formData.day_of_week));
        fd.set("time", formData.time);
        fd.set("title", formData.title);
        fd.set("description", formData.description);
        fd.set("location", formData.location);
        fd.set("is_active", String(formData.is_active));

        if (editingId) {
            await updateMassSchedule(editingId, fd);
        } else {
            await createMassSchedule(fd);
        }

        resetForm();
        fetchSchedules();
    };

    const handleDelete = async (id: number) => {
        if (confirm("Tem certeza que deseja excluir este horário de missa?")) {
            await deleteMassSchedule(id);
            fetchSchedules();
        }
    };

    const getDayName = (dayOfWeek: number) => {
        return DAYS_OF_WEEK.find(d => d.value === dayOfWeek)?.label || "";
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Horários de Missa</h1>
                    <p className="text-gray-500 mt-1">Gerencie os horários que aparecem no calendário</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    <Plus size={20} />
                    Novo Horário
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">
                                {editingId ? "Editar Horário" : "Novo Horário de Missa"}
                            </h2>
                            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Dia da Semana *
                                    </label>
                                    <select
                                        value={formData.day_of_week}
                                        onChange={(e) => setFormData({ ...formData, day_of_week: Number(e.target.value) })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    >
                                        {DAYS_OF_WEEK.map(day => (
                                            <option key={day.value} value={day.value}>{day.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Horário *
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Ex: Santa Missa Dominical"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descrição
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Ex: Celebração Eucarística com Novena..."
                                    rows={2}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Local
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    placeholder="Igreja Matriz"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="is_active"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="is_active" className="text-sm text-gray-700">
                                    Ativo (aparece no calendário)
                                </label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                                >
                                    <Save size={18} />
                                    {editingId ? "Atualizar" : "Salvar"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Schedule List */}
            {loading ? (
                <div className="text-center py-12 text-gray-500">Carregando...</div>
            ) : schedules.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                    <ChurchIcon size={48} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Nenhum horário de missa cadastrado.</p>
                    <p className="text-gray-400 text-sm mt-1">Clique em "Novo Horário" para adicionar.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Dia</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Horário</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Título</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {schedules.map((schedule) => (
                                <tr key={schedule.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {getDayName(schedule.day_of_week)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-gray-700">
                                            <Clock size={16} className="text-gray-400" />
                                            {schedule.time}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-700">{schedule.title}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${schedule.is_active
                                                ? "bg-green-100 text-green-700"
                                                : "bg-gray-100 text-gray-500"
                                            }`}>
                                            {schedule.is_active ? "Ativo" : "Inativo"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleEdit(schedule)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-2"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(schedule.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
