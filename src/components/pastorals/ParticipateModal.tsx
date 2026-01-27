"use client";

import { useState } from "react";
import { X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { sendParticipationData } from "@/lib/actions";

interface ParticipateModalProps {
    pastoralName: string;
    coordinatorName?: string;
    coordinatorContact?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function ParticipateModal({ pastoralName, coordinatorName, coordinatorContact, isOpen, onClose }: ParticipateModalProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        whatsapp: "",
        email: "",
        community: "",
        reason: ""
    });

    if (!isOpen) return null;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        try {
            const result = await sendParticipationData({
                ...formData,
                pastoralName,
                coordinatorName,
                coordinatorContact
            });

            if (result.success) {
                setStatus("success");
                setFormData({ name: "", whatsapp: "", email: "", community: "", reason: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Submit error:", error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-primary p-6 flex justify-between items-center text-white">
                    <div>
                        <h2 className="text-xl font-bold">Quero Participar</h2>
                        <p className="text-primary-foreground/80 text-sm mt-1">
                            {pastoralName}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {status === "success" ? (
                        <div className="text-center py-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                                <CheckCircle2 className="text-green-600" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Solicitação Enviada!</h3>
                            <p className="text-gray-600 mb-8 max-w-xs mx-auto">
                                Obrigado pelo interesse! Seus dados foram enviados para a coordenação. Em breve entraremos em contato.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition shadow-lg w-full"
                            >
                                Fechar
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {status === "error" && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3 text-red-700 text-sm">
                                    <AlertCircle size={20} className="shrink-0" />
                                    <p>Ocorreu um erro ao enviar. Por favor, tente novamente.</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Seu nome"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp *</label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.whatsapp}
                                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                        placeholder="(00) 00000-0000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                        placeholder="seu@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Qual comunidade frequenta?</label>
                                <select
                                    value={formData.community}
                                    onChange={e => setFormData({ ...formData, community: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition bg-white"
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Matriz São Pio X">Matriz São Pio X</option>
                                    <option value="Comunidade Santa Teresinha">Comunidade Santa Teresinha</option>
                                    <option value="Comunidade São João Batista">Comunidade São João Batista</option>
                                    <option value="Outra Paróquia">Outra Paróquia</option>
                                    <option value="Não participo ainda">Não participo ainda</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Por que quer participar?</label>
                                <textarea
                                    value={formData.reason}
                                    onChange={e => setFormData({ ...formData, reason: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                    placeholder="Conte-nos um pouco sobre seu interesse..."
                                    rows={3}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-md mt-4"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} /> Enviando...
                                    </>
                                ) : (
                                    "Enviar Solicitação"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
