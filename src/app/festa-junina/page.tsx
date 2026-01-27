"use client";

import { useState } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import {
    Users, Eye, Share2, MapPin, Heart, Building2,
    Star, Trophy, Award, Send, X, Loader2, CheckCircle
} from "lucide-react";

const benefits = [
    { icon: Eye, text: "Visibilidade para centenas de pessoas da região" },
    { icon: Share2, text: "Divulgação no site, redes sociais e materiais do evento" },
    { icon: MapPin, text: "Presença da marca durante a festa" },
    { icon: Building2, text: "Fortalecimento da imagem institucional" },
    { icon: Heart, text: "Apoio direto a uma iniciativa comunitária" },
];

const sponsorshipTypes = [
    {
        name: "Apoiador",
        icon: Star,
        description: "Contribuição inicial para apoiar a realização do evento"
    },
    {
        name: "Patrocinador",
        icon: Trophy,
        description: "Maior visibilidade e destaque nos materiais promocionais"
    },
    {
        name: "Parceiro Oficial",
        icon: Award,
        description: "Máxima exposição e reconhecimento como parceiro principal"
    },
];

const businessTypes = [
    "Comércio",
    "Serviços",
    "Indústria",
    "Alimentação",
    "Saúde",
    "Educação",
    "Outro",
];

export default function FestaJuninaPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        empresa: "",
        responsavel: "",
        telefone: "",
        email: "",
        tipoEmpresa: "",
        interesse: "",
        observacoes: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await fetch("https://automacao2.themidiamarketing.com.br/webhook/patrocinio-festa-junina", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            setIsSuccess(true);
            setFormData({
                empresa: "",
                responsavel: "",
                telefone: "",
                email: "",
                tipoEmpresa: "",
                interesse: "",
                observacoes: "",
            });
        } catch (error) {
            console.error("Erro ao enviar:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />

            <main className="flex-grow">
                {/* Hero */}
                <section className="relative py-20 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 text-white overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
                        <div className="absolute top-32 right-20 w-16 h-16 border-4 border-white transform rotate-45"></div>
                        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-4 border-white rounded-full"></div>
                        <div className="absolute bottom-10 right-1/3 w-24 h-24 border-4 border-white transform rotate-12"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <span className="inline-block bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            🎪 Evento Comunitário
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            Festa Junina da Paróquia São Pio X
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                            Seja um patrocinador e fortaleça a comunidade local
                        </p>
                    </div>
                </section>

                {/* Texto Institucional */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <p className="text-lg text-gray-700 leading-relaxed">
                                A Festa Junina da Paróquia São Pio X é um dos eventos mais aguardados da nossa
                                comunidade, reunindo famílias, moradores do bairro e visitantes de toda a região.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mt-4">
                                Além de promover cultura, convivência e alegria, a festa também é uma excelente
                                oportunidade para empresas locais ampliarem sua visibilidade e associarem sua marca
                                a um evento comunitário, familiar e cristão.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Por que patrocinar */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                            Por que patrocinar?
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <benefit.icon className="text-orange-600" size={24} />
                                    </div>
                                    <p className="text-gray-700 font-medium">{benefit.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tipos de Patrocínio */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
                            Tipos de Patrocínio
                        </h2>
                        <p className="text-center text-gray-500 mb-12">
                            Os detalhes das cotas são apresentados após o contato.
                        </p>
                        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {sponsorshipTypes.map((type, index) => (
                                <div
                                    key={index}
                                    className="text-center p-8 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                                        <type.icon className="text-orange-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{type.name}</h3>
                                    <p className="text-gray-600 text-sm">{type.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-16 bg-orange-600">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Faça parte dessa festa!
                        </h2>
                        <p className="text-white/90 mb-8 max-w-xl mx-auto">
                            Entre em contato conosco e saiba como sua empresa pode participar.
                        </p>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                setIsSuccess(false);
                            }}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold text-lg rounded-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <Users size={24} />
                            Quero ser patrocinador
                        </button>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Modal de Formulário */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    />

                    <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 my-8">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={24} />
                        </button>

                        {isSuccess ? (
                            <div className="text-center py-8">
                                <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Obrigado pelo interesse!
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Entraremos em contato em breve para apresentar as opções de patrocínio.
                                </p>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700"
                                >
                                    Fechar
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">
                                    Formulário de Patrocínio
                                </h3>
                                <p className="text-gray-500 text-sm mb-6">
                                    Preencha os dados abaixo e entraremos em contato.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nome da Empresa *
                                        </label>
                                        <input
                                            type="text"
                                            name="empresa"
                                            value={formData.empresa}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Nome do Responsável *
                                        </label>
                                        <input
                                            type="text"
                                            name="responsavel"
                                            value={formData.responsavel}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Telefone / WhatsApp *
                                            </label>
                                            <input
                                                type="tel"
                                                name="telefone"
                                                value={formData.telefone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                E-mail *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Tipo de Empresa *
                                            </label>
                                            <select
                                                name="tipoEmpresa"
                                                value={formData.tipoEmpresa}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="">Selecione...</option>
                                                {businessTypes.map((type) => (
                                                    <option key={type} value={type}>{type}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Interesse *
                                            </label>
                                            <select
                                                name="interesse"
                                                value={formData.interesse}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            >
                                                <option value="">Selecione...</option>
                                                <option value="Apoiador">Apoiador</option>
                                                <option value="Patrocinador">Patrocinador</option>
                                                <option value="Parceiro Oficial">Parceiro Oficial</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Observações
                                        </label>
                                        <textarea
                                            name="observacoes"
                                            value={formData.observacoes}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Alguma dúvida ou informação adicional?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={20} />
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={20} />
                                                Enviar
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
