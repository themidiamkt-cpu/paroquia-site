"use client";

import { useState, useEffect } from "react";
import { getForms, createForm } from "@/lib/actions";
import { Plus, Edit, ExternalLink, FileText } from "lucide-react";
import Link from "next/link";

interface DatabaseForm {
    id: number;
    title: string;
    slug: string;
    description?: string | null;
}

type ManagedFormCard = {
    id: number | string;
    title: string;
    slug: string;
    description: string;
    publicPath?: string;
    source: "dynamic" | "native";
};

const nativeForms: ManagedFormCard[] = [
    {
        id: "native-batismo",
        title: "Solicitação de Batismo",
        slug: "batismo",
        description: "Formulário público para dar início ao processo de batismo.",
        publicPath: "/batismo",
        source: "native",
    },
    {
        id: "native-catequese",
        title: "Inscrição na Catequese",
        slug: "catequese",
        description: "Formulário público para inscrição de catequizandos.",
        publicPath: "/catequese",
        source: "native",
    },
    {
        id: "native-intencao-missa",
        title: "Intenção de Missa",
        slug: "intencao-missa",
        description: "Formulário público para envio de intenções de missa.",
        publicPath: "/intencao-missa",
        source: "native",
    },
    {
        id: "native-contato",
        title: "Contato",
        slug: "contato",
        description: "Formulário público para dúvidas e atendimento geral da secretaria.",
        publicPath: "/contato",
        source: "native",
    },
    {
        id: "native-reforma",
        title: "Quero Ajudar na Reforma",
        slug: "reforma",
        description: "Formulário público para apoio financeiro, material ou serviço na reforma.",
        publicPath: "/reforma",
        source: "native",
    },
    {
        id: "native-pastorais",
        title: "Quero Participar nas Pastorais",
        slug: "pastorais",
        description: "Formulário do modal de participação nas pastorais com seleção de comunidade.",
        publicPath: "/pastorais",
        source: "native",
    },
    {
        id: "native-patrocinio-festa-junina",
        title: "Patrocínio Festa Junina",
        slug: "patrocinio-festa-junina",
        description: "Formulário do modal para empresas interessadas em patrocinar a Festa Junina.",
        publicPath: "/festa-junina",
        source: "native",
    },
];

function mergeForms(databaseForms: DatabaseForm[]) {
    const merged = new Map<string, ManagedFormCard>();

    nativeForms.forEach((form) => {
        merged.set(form.slug, form);
    });

    databaseForms.forEach((form) => {
        const existingForm = merged.get(form.slug);

        merged.set(form.slug, {
            id: form.id,
            title: form.title,
            slug: form.slug,
            description:
                form.description?.trim() ||
                existingForm?.description ||
                "Sem descrição.",
            publicPath: existingForm?.publicPath,
            source: "dynamic",
        });
    });

    return Array.from(merged.values()).sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
}

export default function AdminFormsListPage() {
    const [forms, setForms] = useState<ManagedFormCard[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);

    async function loadForms() {
        setLoading(true);
        const data = await getForms();
        setForms(mergeForms((data || []) as DatabaseForm[]));
        setLoading(false);
    }

    useEffect(() => {
        let isMounted = true;

        void getForms().then((data) => {
            if (!isMounted) {
                return;
            }

            setForms(mergeForms((data || []) as DatabaseForm[]));
            setLoading(false);
        });

        return () => {
            isMounted = false;
        };
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        // Basic slug generation from title if not provided/auto-generated logic
        // For now, we expect backend or manual entry. Let's start simple.

        await createForm(formData);
        setIsCreating(false);
        loadForms();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gerenciar Formulários</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition"
                >
                    <Plus size={20} /> Novo Formulário
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 mb-6 animate-in slide-in-from-top-4">
                    <h2 className="text-lg font-bold mb-4">Criar Novo Formulário</h2>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <input name="title" required className="w-full p-2 border rounded" placeholder="Ex: Inscrição Catequese" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug (URL amigável)</label>
                                <input name="slug" required className="w-full p-2 border rounded" placeholder="Ex: inscricao-catequese" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Descrição</label>
                            <textarea name="description" className="w-full p-2 border rounded" rows={3}></textarea>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Texto do Botão</label>
                                <input name="submit_label" defaultValue="Enviar" className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Mensagem de Sucesso</label>
                                <textarea name="success_message" defaultValue="Formulário enviado com sucesso!" className="w-full p-2 border rounded" rows={2}></textarea>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setIsCreating(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Salvar e Criar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {forms.map(form => (
                    <div key={form.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-primary rounded-lg">
                                <FileText size={24} />
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded">/{form.slug}</span>
                                <span
                                    className={`text-[11px] px-2 py-1 rounded-full font-semibold ${
                                        form.source === "dynamic"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                                >
                                    {form.source === "dynamic" ? "Editor disponível" : "Formulário nativo"}
                                </span>
                            </div>
                        </div>
                        <h3 className="font-bold text-lg mb-2">{form.title}</h3>
                        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{form.description || "Sem descrição."}</p>

                        <div className="pt-4 border-t border-gray-100 flex flex-wrap justify-between items-center gap-3">
                            {form.source === "dynamic" ? (
                                <Link
                                    href={`/admin/formularios/gerenciar/${form.id}`}
                                    className="flex items-center gap-2 text-primary font-bold hover:underline"
                                >
                                    <Edit size={16} /> Editar Campos
                                </Link>
                            ) : (
                                <span className="text-sm font-medium text-gray-500">
                                    Campos gerenciados no codigo
                                </span>
                            )}

                            {form.publicPath && (
                                <Link
                                    href={form.publicPath}
                                    className="flex items-center gap-2 text-gray-600 font-medium hover:text-primary transition"
                                >
                                    <ExternalLink size={16} /> Abrir pagina
                                </Link>
                            )}
                        </div>
                    </div>
                ))}

                {forms.length === 0 && !loading && (
                    <div className="col-span-full py-12 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        Nenhum formulário encontrado. Crie o primeiro acima.
                    </div>
                )}
            </div>
        </div>
    );
}
