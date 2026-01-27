"use client";

import { useState, useEffect } from "react";
import { getFormById, saveField, deleteField, updateForm } from "@/lib/actions";
import { Plus, Trash2, Save, ArrowLeft, GripVertical, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FormBuilderPage({ params }: { params: { id: string } }) {
    const [form, setForm] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [editingField, setEditingField] = useState<any | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const router = useRouter();

    useEffect(() => {
        loadForm();
    }, [params.id]);

    async function loadForm() {
        setLoading(true);
        const data = await getFormById(Number(params.id));
        setForm(data);
        setLoading(false);
    }

    async function handleSaveField(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const fieldData = {
            id: editingField?.id,
            form_id: Number(params.id),
            label: formData.get("label"),
            field_name: formData.get("field_name"),
            field_type: formData.get("field_type"),
            placeholder: formData.get("placeholder"),
            required: formData.get("required") === "true",
            options: formData.get("options") ? (formData.get("options") as string).split(",").map(s => s.trim()) : null,
            order_index: Number(formData.get("order_index")) || (form?.fields?.length || 0) + 1
        };

        try {
            await saveField(fieldData);
            setEditingField(null);
            loadForm();
        } catch (error) {
            alert("Erro ao salvar campo");
        }
    }

    async function handleDeleteField(id: number) {
        if (!confirm("Tem certeza que deseja excluir este campo?")) return;
        try {
            await deleteField(id, Number(params.id));
            loadForm();
        } catch (error) {
            alert("Erro ao excluir campo");
        }
    }

    async function handleUpdateFormSettings(e: React.FormEvent) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        try {
            await updateForm(Number(params.id), formData);
            setShowSettings(false);
            loadForm();
        } catch (error) {
            alert("Erro ao atualizar configurações");
        }
    }

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando formulário...</div>;
    if (!form) return <div className="p-8 text-center text-red-500">Formulário não encontrado.</div>;

    return (
        <div className="max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/formularios/gerenciar" className="p-2 hover:bg-gray-100 rounded-full transition text-gray-600">
                    <ArrowLeft size={24} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{form.title}</h1>
                    <p className="text-gray-500 text-sm">Slug: {form.slug} • {form.fields?.length || 0} campos</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <button
                        onClick={() => setShowSettings(true)}
                        className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition shadow-sm"
                    >
                        <Settings size={18} /> Configurações
                    </button>
                    <button
                        onClick={() => setEditingField({ form_id: form.id })} // Empty obj triggers create mode
                        className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition shadow-md"
                    >
                        <Plus size={18} /> Adicionar Campo
                    </button>
                </div>
            </div>

            {/* Field List */}
            <div className="space-y-4">
                {form.fields && form.fields.map((field: any) => (
                    <div key={field.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4 hover:border-gray-300 transition group">
                        <div className="text-gray-300 cursor-move">
                            <GripVertical size={20} />
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-800">{field.label}</span>
                                {field.required && <span className="text-red-500 text-xs font-bold">*</span>}
                                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase">{field.field_type}</span>
                            </div>
                            <div className="text-xs text-gray-400 font-mono">key: {field.field_name}</div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => setEditingField(field)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                                title="Editar"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDeleteField(field.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                                title="Excluir"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                {(!form.fields || form.fields.length === 0) && (
                    <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl text-gray-400">
                        Este formulário ainda não tem campos. Adicione o primeiro!
                    </div>
                )}
            </div>

            {/* Field Modal */}
            {editingField && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-4">{editingField.id ? "Editar Campo" : "Novo Campo"}</h2>
                        <form onSubmit={handleSaveField} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Rótulo (Label)</label>
                                <input name="label" required defaultValue={editingField.label} className="w-full p-2 border rounded" placeholder="Ex: Nome Completo" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Nome Interno (Key)</label>
                                    <input name="field_name" required defaultValue={editingField.field_name} className="w-full p-2 border rounded" placeholder="Ex: full_name" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Tipo</label>
                                    <select name="field_type" required defaultValue={editingField.field_type || "text"} className="w-full p-2 border rounded bg-white">
                                        <option value="text">Texto Curto</option>
                                        <option value="textarea">Texto Longo</option>
                                        <option value="email">E-mail</option>
                                        <option value="tel">Telefone</option>
                                        <option value="date">Data</option>
                                        <option value="select">Seleção (Dropdown)</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Placeholder (Dica)</label>
                                <input name="placeholder" defaultValue={editingField.placeholder} className="w-full p-2 border rounded" placeholder="Ex: Digite seu nome..." />
                            </div>

                            {/* Conditional Options for Select */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Opções (para Seleção)</label>
                                <input
                                    name="options"
                                    defaultValue={editingField.options?.join(", ")}
                                    className="w-full p-2 border rounded"
                                    placeholder="Opção 1, Opção 2, Opção 3 (separadas por vírgula)"
                                />
                                <p className="text-xs text-gray-500 mt-1">Apenas para tipo 'Seleção'. Separe por vírgulas.</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Ordem</label>
                                    <input type="number" name="order_index" defaultValue={editingField.order_index} className="w-full p-2 border rounded" />
                                </div>
                                <div className="flex items-center gap-2 mt-6">
                                    <input type="checkbox" name="required" value="true" defaultChecked={editingField.required} id="reqCheck" />
                                    <label htmlFor="reqCheck" className="text-sm font-medium cursor-pointer">Campo Obrigatório</label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
                                <button type="button" onClick={() => setEditingField(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 flex items-center gap-2">
                                    <Save size={18} /> Salvar Campo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-4">Configurações do Formulário</h2>
                        <form onSubmit={handleUpdateFormSettings} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Título</label>
                                <input name="title" required defaultValue={form.title} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Slug</label>
                                <input name="slug" required defaultValue={form.slug} className="w-full p-2 border rounded bg-gray-50" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Descrição</label>
                                <textarea name="description" defaultValue={form.description} className="w-full p-2 border rounded" rows={3}></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Botão Enviar</label>
                                    <input name="submit_label" defaultValue={form.submit_label} className="w-full p-2 border rounded" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Mensagem Sucesso</label>
                                <textarea name="success_message" defaultValue={form.success_message} className="w-full p-2 border rounded" rows={2}></textarea>
                            </div>

                            <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
                                <button type="button" onClick={() => setShowSettings(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">Cancelar</button>
                                <button type="submit" className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 flex items-center gap-2">
                                    <Save size={18} /> Atualizar Configurações
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Helper icon component since 'Edit' was used twice
function Edit({ size, className }: { size: number, className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
    );
}
