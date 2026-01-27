"use client";

import { useState, useEffect } from "react";
import { getCommunities, deleteCommunity } from "@/lib/actions";
import { Plus, Trash, Edit, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Community {
    id: number;
    name: string;
    address: string;
    description: string;
    image_url: string;
}

export default function AdminComunidadesPage() {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCommunities();
    }, []);

    async function fetchCommunities() {
        setLoading(true);
        const data = await getCommunities();
        setCommunities(data || []);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja excluir esta comunidade?")) return;
        await deleteCommunity(id);
        fetchCommunities();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Comunidades</h1>
                <Link
                    href="/admin/comunidades/novo"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Nova Comunidade
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full text-center py-12 text-gray-500">Carregando...</div>
                ) : communities.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-gray-100">
                        Nenhuma comunidade cadastrada.
                    </div>
                ) : (
                    communities.map((community) => (
                        <div key={community.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                            <div className="relative h-48 w-full bg-gray-100">
                                {community.image_url ? (
                                    <Image
                                        src={community.image_url}
                                        alt={community.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <MapPin size={48} />
                                    </div>
                                )}
                            </div>
                            <div className="p-5 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg mb-1">{community.name}</h3>
                                <p className="text-sm text-gray-500 mb-3 flex items-start gap-1">
                                    <MapPin size={14} className="mt-0.5 shrink-0" />
                                    {community.address}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-1">
                                    {community.description}
                                </p>
                                <div className="flex justify-end gap-2 pt-4 border-t border-gray-50 mt-auto">
                                    <Link
                                        href={`/admin/comunidades/${community.id}`}
                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-3 py-1.5 rounded hover:bg-blue-50 transition text-sm font-medium"
                                    >
                                        <Edit size={16} /> Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(community.id)}
                                        className="flex items-center gap-1 text-red-600 hover:text-red-800 px-3 py-1.5 rounded hover:bg-red-50 transition text-sm font-medium"
                                    >
                                        <Trash size={16} /> Excluir
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
