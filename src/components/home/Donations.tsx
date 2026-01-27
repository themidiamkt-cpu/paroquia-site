"use client";

import { useState } from "react";
import { Heart, Copy, Check, Mail, Building2 } from "lucide-react";

const pixKeys = [
    {
        type: "E-mail",
        key: "saopiox@arquidiocesecampinas.com",
        icon: Mail,
    },
    {
        type: "CNPJ",
        key: "44588960/0014-04",
        icon: Building2,
    },
];

export function Donations() {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    const copyToClipboard = async (key: string) => {
        try {
            await navigator.clipboard.writeText(key);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        } catch (err) {
            console.error("Erro ao copiar:", err);
        }
    };

    return (
        <section className="py-16 bg-primary text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                            <Heart size={32} className="text-secondary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-3">
                            Contribua com a Paróquia
                        </h2>
                        <p className="text-white/80">
                            Sua doação ajuda a manter as atividades pastorais e a estrutura da nossa comunidade.
                        </p>
                    </div>

                    {/* PIX Keys */}
                    <div className="grid md:grid-cols-2 gap-4">
                        {pixKeys.map((pix) => (
                            <div
                                key={pix.key}
                                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20"
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <pix.icon size={20} className="text-secondary" />
                                    <span className="font-semibold text-secondary">
                                        Chave PIX ({pix.type})
                                    </span>
                                </div>

                                <div className="bg-white/10 rounded-lg p-3 mb-3">
                                    <code className="text-sm md:text-base break-all">
                                        {pix.key}
                                    </code>
                                </div>

                                <button
                                    onClick={() => copyToClipboard(pix.key)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-white font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                                >
                                    {copiedKey === pix.key ? (
                                        <>
                                            <Check size={18} />
                                            <span>Copiado!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} />
                                            <span>Copiar chave</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Agradecimento */}
                    <p className="mt-8 text-white/60 text-sm">
                        Que Deus abençoe sua generosidade!
                    </p>
                </div>
            </div>
        </section>
    );
}
