"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
    getCommunityById,
    updateCommunity,
    uploadImage,
    getCommunitySchedules,
    createCommunitySchedule,
    deleteCommunitySchedule
} from "@/lib/actions";
import { ArrowLeft, Save, Upload, Loader2, Plus, Trash, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Schedule {
    id: number;
    day_of_week: number;
    time: string;
    type: string;
    description: string;
}

export default function EditarComunidadePage() {
    const router = useRouter();
    const params = useParams();
    const id = Number(params.id);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Community Data
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        description: "",
        image_url: ""
    });

    // Schedules Data
    const [schedules, setSchedules] = useState<Schedule[]>([]);
    const [newSchedule, setNewSchedule] = useState({
        day_of_week: "0",
        time: "",
        type: "Missa",
        description: ""
    });

    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id]);

    async function loadData() {
        setLoading(true);
        const [community, communitySchedules] = await Promise.all([
            getCommunityById(id),
            getCommunitySchedules(id)
        ]);

        if (community) {
            setFormData({
                name: community.name,
                address: community.address,
                description: community.description || "",
                image_url: community.image_url || ""
            });
        }

        setSchedules(communitySchedules || []);
        setLoading(false);
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("folder", "comunidades");

            const url = await uploadImage(data);
            setFormData({ ...formData, image_url: url || "" });
        } catch (error) {
            console.error("Erro ao fazer upload:", error);
            alert("Erro ao fazer upload da imagem.");
        } finally {
            setUploading(false);
        }
    }

    async function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("address", formData.address);
            data.append("description", formData.description);
            data.append("image_url", formData.image_url);

            await updateCommunity(id, data);
            alert("Comunidade atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar comunidade:", error);
            alert("Erro ao atualizar comunidade.");
        } finally {
            setSaving(false);
        }
    }

    async function handleAddSchedule() {
        if (!newSchedule.time) return alert("Informe o horário.");

        try {
            const data = new FormData();
            data.append("community_id", id.toString());
            data.append("day_of_week", newSchedule.day_of_week);
            data.append("time", newSchedule.time);
            data.append("type", newSchedule.type);
            data.append("description", newSchedule.description);

            await createCommunitySchedule(data);

            // Reset form and reload schedules
            setNewSchedule({ ...newSchedule, time: "", description: "" });
            const updatedSchedules = await getCommunitySchedules(id);
            setSchedules(updatedSchedules || []);
        } catch (error) {
            console.error("Erro ao adicionar horário:", error);
            alert("Erro ao adicionar horário.");
        }
    }

    async function handleDeleteSchedule(scheduleId: number) {
        if (!confirm("Remover este horário?")) return;

        try {
            await deleteCommunitySchedule(scheduleId);
            const updatedSchedules = await getCommunitySchedules(id);
            setSchedules(updatedSchedules || []);
        } catch (error) {
            console.error("Erro ao remover horário:", error);
        }
    }

    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    if (loading) return <div className="text-center py-12">Carregando...</div>;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/admin/comunidades" className="text-gray-500 hover:text-gray-700">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-2xl font-bold text-gray-800">Editar Comunidade</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info Form */}
                <div className="lg:col-span-2 space-y-8">
                    <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold mb-6 pb-2 border-b border-gray-100">Informações Básicas</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome da Comunidade *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Endereço *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                                <textarea
                                    rows={4}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 flex flex-col items-center justify-center min-h-[200px] bg-gray-50 relative overflow-hidden group">
                                    {formData.image_url ? (
                                        <>
                                            <Image
                                                src={formData.image_url}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white font-medium">Clique para alterar</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            {uploading ? (
                                                <Loader2 className="animate-spin mx-auto mb-2" size={24} />
                                            ) : (
                                                <Upload className="mx-auto mb-2" size={24} />
                                            )}
                                            <p className="text-sm">Clique para fazer upload</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        disabled={uploading}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-8">
                            <button
                                type="submit"
                                disabled={saving || uploading}
                                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition flex items-center gap-2 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>

                {/* Schedules Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h2 className="text-lg font-bold mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                            <Clock size={20} className="text-primary" />
                            Horários
                        </h2>

                        {/* Add Schedule Form */}
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                            <h3 className="text-sm font-bold text-gray-700 mb-3">Adicionar Horário</h3>
                            <div className="space-y-3">
                                <select
                                    value={newSchedule.day_of_week}
                                    onChange={e => setNewSchedule({ ...newSchedule, day_of_week: e.target.value })}
                                    className="w-full p-2 text-sm border rounded"
                                >
                                    {days.map((day, index) => (
                                        <option key={index} value={index}>{day}</option>
                                    ))}
                                </select>
                                <div className="flex gap-2">
                                    <input
                                        type="time"
                                        value={newSchedule.time}
                                        onChange={e => setNewSchedule({ ...newSchedule, time: e.target.value })}
                                        className="w-full p-2 text-sm border rounded"
                                    />
                                    <select
                                        value={newSchedule.type}
                                        onChange={e => setNewSchedule({ ...newSchedule, type: e.target.value })}
                                        className="w-full p-2 text-sm border rounded"
                                    >
                                        <option value="Missa">Missa</option>
                                        <option value="Celebração">Celebração</option>
                                    </select>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Obs (opcional)"
                                    value={newSchedule.description}
                                    onChange={e => setNewSchedule({ ...newSchedule, description: e.target.value })}
                                    className="w-full p-2 text-sm border rounded"
                                />
                                <button
                                    onClick={handleAddSchedule}
                                    className="w-full bg-secondary text-white py-2 rounded text-sm font-medium hover:bg-secondary/90 transition flex items-center justify-center gap-1"
                                >
                                    <Plus size={16} /> Adicionar
                                </button>
                            </div>
                        </div>

                        {/* Schedules List */}
                        <div className="space-y-3">
                            {schedules.length === 0 ? (
                                <p className="text-center text-gray-500 text-sm py-4">Nenhum horário cadastrado.</p>
                            ) : (
                                schedules.map(schedule => (
                                    <div key={schedule.id} className="flex items-start justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm">
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">
                                                {days[schedule.day_of_week]} - {schedule.time.slice(0, 5)}
                                            </p>
                                            <p className="text-xs text-primary font-medium">{schedule.type}</p>
                                            {schedule.description && (
                                                <p className="text-xs text-gray-500 mt-1">{schedule.description}</p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteSchedule(schedule.id)}
                                            className="text-gray-400 hover:text-red-600 transition p-1"
                                        >
                                            <Trash size={14} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
