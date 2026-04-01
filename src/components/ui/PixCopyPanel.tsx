"use client";

import { useState } from "react";
import { Building2, Check, Copy, Heart, Mail } from "lucide-react";

import { pixKeys } from "@/lib/pix";

interface PixCopyPanelProps {
    title?: string;
    description?: string;
    compact?: boolean;
}

const iconMap = {
    building: Building2,
    mail: Mail,
};

export function PixCopyPanel({
    title = "PIX copia e cola",
    description = "Escolha uma das chaves abaixo para fazer sua contribuição agora.",
    compact = false,
}: PixCopyPanelProps) {
    const [copiedKey, setCopiedKey] = useState<string | null>(null);

    async function copyToClipboard(key: string) {
        try {
            await navigator.clipboard.writeText(key);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        } catch (error) {
            console.error("Erro ao copiar chave PIX:", error);
        }
    }

    return (
        <div className="rounded-xl border border-secondary/20 bg-secondary/5 p-4">
            <div className="mb-4 flex items-start gap-3">
                <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <Heart size={18} />
                </div>
                <div>
                    <h3 className="font-bold text-primary">{title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                </div>
            </div>

            <div className={`grid gap-3 ${compact ? "grid-cols-1" : "md:grid-cols-2"}`}>
                {pixKeys.map((pix) => {
                    const Icon = iconMap[pix.icon];

                    return (
                        <div
                            key={pix.key}
                            className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
                        >
                            <div className="mb-2 flex items-center gap-2">
                                <Icon size={16} className="text-secondary" />
                                <span className="text-sm font-semibold text-gray-700">
                                    Chave PIX ({pix.type})
                                </span>
                            </div>

                            <div className="mb-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                                <code className="break-all text-xs text-gray-700 md:text-sm">
                                    {pix.key}
                                </code>
                            </div>

                            <button
                                type="button"
                                onClick={() => copyToClipboard(pix.key)}
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                                    copiedKey === pix.key
                                        ? "bg-green-100 text-green-700"
                                        : "bg-secondary text-white hover:bg-secondary/90"
                                }`}
                            >
                                {copiedKey === pix.key ? (
                                    <>
                                        <Check size={16} />
                                        Copiado!
                                    </>
                                ) : (
                                    <>
                                        <Copy size={16} />
                                        Copiar chave
                                    </>
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
