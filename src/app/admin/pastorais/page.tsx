"use client";

import { useState, useEffect } from "react";
import {
    getPastorals, createPastoral, updatePastoral, deletePastoral,
    uploadImage, getPastoralMembers, addPastoralMember, deletePastoralMember
} from "@/lib/actions";
import { Plus, Trash, Edit, Save, Loader2, Upload, User, Phone, Users } from "lucide-react";

interface PastoralItem {
    id: number;
    name: string;
    description: string;
    coordinator: string;
    contact: string;
    image_url?: string;
}

interface MemberItem {
    id: number;
    name: string;
    role: string;
}

export default function AdminPastoraisPage() {
    const [pastorals, setPastorals] = useState<PastoralItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<PastoralItem>>({});

    // Members state
    const [members, setMembers] = useState<MemberItem[]>([]);
    const [newMemberName, setNewMemberName] = useState("");
    const [newMemberRole, setNewMemberRole] = useState("");
    const [loadingMembers, setLoadingMembers] = useState(false);

    const [coordinatorsList, setCoordinatorsList] = useState<string[]>([""]);

    useEffect(() => {
        fetchPastorals();
    }, []);

    useEffect(() => {
        if (currentItem.id) {
            fetchMembers(currentItem.id);
            // Initialize coordinators list
            if (currentItem.coordinator) {
                // Try to split smartly, but for now specific to our format
                // If it contains " e ", split.
                if (currentItem.coordinator.includes(" e ")) {
                    setCoordinatorsList(currentItem.coordinator.split(" e "));
                } else {
                    setCoordinatorsList([currentItem.coordinator]);
                }
            } else {
                setCoordinatorsList([""]);
            }
        } else {
            setMembers([]);
            if (!currentItem.coordinator) {
                setCoordinatorsList([""]);
            }
        }
    }, [currentItem.id]);

    async function fetchPastorals() {
        setLoading(true);
        const data = await getPastorals();
        setPastorals(data || []);
        setLoading(false);
    }

    async function fetchMembers(id: number) {
        setLoadingMembers(true);
        const data = await getPastoralMembers(id);
        setMembers(data || []);
        setLoadingMembers(false);
    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "pastorais");

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

    function updateCoordinator(index: number, value: string) {
        const newList = [...coordinatorsList];
        newList[index] = value;
        setCoordinatorsList(newList);
    }

    function addCoordinator() {
        setCoordinatorsList([...coordinatorsList, ""]);
    }

    function removeCoordinator(index: number) {
        const newList = coordinatorsList.filter((_, i) => i !== index);
        setCoordinatorsList(newList.length ? newList : [""]);
    }

    async function handleSave() {
        if (!currentItem.name) return;

        // Join coordinators
        // Use Intl.ListFormat for correct "A, B e C" if supported, or manual
        const validCoordinators = coordinatorsList.map(c => c.trim()).filter(Boolean);
        let finalCoordinatorString = "";

        if (validCoordinators.length > 0) {
            if (validCoordinators.length === 1) {
                finalCoordinatorString = validCoordinators[0];
            } else {
                // Formatting "A e B" or "A, B e C"
                // Using ' e ' for strictly 2 is simple and retroactive. 
                // For > 2, normal Portuguese grammar
                const formatter = new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' });
                finalCoordinatorString = formatter.format(validCoordinators);
            }
        }

        const formData = new FormData();
        formData.append("name", currentItem.name);
        formData.append("description", currentItem.description || "");
        formData.append("coordinator", finalCoordinatorString);
        formData.append("contact", currentItem.contact || "");
        formData.append("image_url", currentItem.image_url || "");

        if (currentItem.id) {
            await updatePastoral(currentItem.id, formData);
        } else {
            await createPastoral(formData);
        }

        setIsEditing(false);
        setCurrentItem({});
        fetchPastorals();
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir?")) return;
        await deletePastoral(id);
        fetchPastorals();
    }

    async function handleAddMember() {
        if (!currentItem.id || !newMemberName) return;
        await addPastoralMember(currentItem.id, newMemberName, newMemberRole);
        setNewMemberName("");
        setNewMemberRole("");
        fetchMembers(currentItem.id);
    }

    async function handleDeleteMember(memberId: number) {
        if (!currentItem.id) return;
        await deletePastoralMember(memberId);
        fetchMembers(currentItem.id);
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Pastorais</h1>
                <button
                    onClick={() => { setIsEditing(true); setCurrentItem({}); setCoordinatorsList([""]); }}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Nova Pastoral
                </button>
            </div>

            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <h2 className="font-bold mb-4">{currentItem.id ? "Editar Pastoral" : "Nova Pastoral"}</h2>

                    {/* Members Section - Moved to top as requested */}
                    {currentItem.id ? (
                        <div className="mb-6 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold mb-4 flex items-center gap-2 text-primary">
                                <Users size={18} /> Coordenadores / Membros
                            </h3>

                            <div className="flex gap-2 mb-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-xs font-medium mb-1 text-gray-500">Nome</label>
                                    <input
                                        type="text"
                                        value={newMemberName}
                                        onChange={e => setNewMemberName(e.target.value)}
                                        className="w-full p-2 border rounded text-sm"
                                        placeholder="Nome completo"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-xs font-medium mb-1 text-gray-500">Função/Cargo (Opcional)</label>
                                    <input
                                        type="text"
                                        value={newMemberRole}
                                        onChange={e => setNewMemberRole(e.target.value)}
                                        className="w-full p-2 border rounded text-sm"
                                        placeholder="Ex: Coordenador"
                                    />
                                </div>
                                <button
                                    onClick={handleAddMember}
                                    disabled={!newMemberName}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 h-[38px] flex items-center gap-1"
                                >
                                    <Plus size={16} /> Adicionar
                                </button>
                            </div>

                            <div className="bg-white rounded-lg border overflow-hidden">
                                {loadingMembers ? (
                                    <div className="p-4 text-center text-sm text-gray-500">Carregando...</div>
                                ) : members.length === 0 ? (
                                    <div className="p-4 text-center text-sm text-gray-500">Nenhum coordenador/membro cadastrado.</div>
                                ) : (
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-50 text-gray-600">
                                            <tr>
                                                <th className="py-2 px-4 text-left font-medium">Nome</th>
                                                <th className="py-2 px-4 text-left font-medium">Função</th>
                                                <th className="py-2 px-4 text-right"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {members.map(member => (
                                                <tr key={member.id}>
                                                    <td className="py-2 px-4">{member.name}</td>
                                                    <td className="py-2 px-4 text-gray-500">{member.role || "-"}</td>
                                                    <td className="py-2 px-4 text-right">
                                                        <button
                                                            onClick={() => handleDeleteMember(member.id)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <Trash size={14} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 text-yellow-800 p-3 rounded text-sm mb-6 border border-yellow-200">
                            Salve a pastoral primeiro para adicionar coordenadores e membros.
                        </div>
                    )}

                    {/* Main Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Nome da Pastoral</label>
                            <input
                                type="text"
                                value={currentItem.name || ""}
                                onChange={e => setCurrentItem({ ...currentItem, name: e.target.value })}
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

                        {/* Old Coordinators Field - Hidden or Removed? 
                            The user said "os coordenadores tem que ficar em cima". 
                            Since we are using the members list as the main source of truth for coordinators now,
                            we can hide this field to avoid confusion, OR keep it as a "Main Coordinator" field.
                            Given the user's request, the list is more important. 
                            I will comment it out or remove it to avoid duplication/confusion.
                        */}
                        {/* 
                        <div>
                            <label className="block text-sm font-medium mb-1">Coordenador Principal (Opcional)</label>
                            ...
                        </div> 
                        */}

                        <div>
                            <label className="block text-sm font-medium mb-1">Contato Geral (WhatsApp)</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-2.5 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    value={currentItem.contact || ""}
                                    onChange={e => setCurrentItem({ ...currentItem, contact: e.target.value })}
                                    className="w-full pl-9 p-2 border rounded"
                                    placeholder="Ex: 19999999999"
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label className="block text-sm font-medium mb-1">Logo / Imagem</label>
                            <div className="flex gap-2 items-start">
                                <div className="flex-1">
                                    <label className="flex flex-col items-center px-4 py-4 bg-gray-50 text-gray-500 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition">
                                        {uploading ? (
                                            <span className="flex items-center gap-2"><Loader2 className="animate-spin" /> Enviando...</span>
                                        ) : (
                                            <span className="flex items-center gap-2"><Upload size={18} /> Clique para selecionar</span>
                                        )}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
                                    </label>
                                </div>
                                {currentItem.image_url && (
                                    <div className="h-20 w-20 relative border rounded bg-gray-100 overflow-hidden shrink-0">
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
                    </div>

                    <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                        <button onClick={() => setIsEditing(false)} className="px-4 py-2 border rounded hover:bg-gray-50">Cancelar</button>
                        <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"><Save size={18} /> Salvar Pastoral</button>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Pastoral</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Coordenação</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={3} className="p-6 text-center">Carregando...</td></tr>
                        ) : pastorals.length === 0 ? (
                            <tr><td colSpan={3} className="p-6 text-center text-gray-500">Nenhuma pastoral cadastrada.</td></tr>
                        ) : (
                            pastorals.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6">
                                        <div className="flex items-center gap-3">
                                            {item.image_url && (
                                                <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
                                                    <img src={item.image_url} alt="" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-bold text-gray-800">{item.name}</div>
                                                <div className="text-sm text-gray-500 line-clamp-1">{item.description}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-600">
                                        {item.coordinator && <div className="font-medium flex items-center gap-1"><User size={12} /> {item.coordinator}</div>}
                                        {item.contact && <div className="text-xs text-green-600 flex items-center gap-1"><Phone size={10} /> {item.contact}</div>}
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
