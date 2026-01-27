"use client";

import { useState } from "react";
import { X, Copy, Check, Mail, Building2, Heart } from "lucide-react";

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

interface PixModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PixModal({ isOpen, onClose }: PixModalProps) {
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary/10 rounded-full mb-3">
                        <Heart size={28} className="text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                        Contribua com a Reforma
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                        Escolha uma chave PIX para fazer sua doação
                    </p>
                </div>

                {/* PIX Keys */}
                <div className="space-y-3">
                    {pixKeys.map((pix) => (
                        <div
                            key={pix.key}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-100"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <pix.icon size={16} className="text-secondary" />
                                <span className="font-semibold text-gray-700 text-sm">
                                    Chave {pix.type}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <code className="flex-1 text-sm bg-white px-3 py-2 rounded border border-gray-200 break-all">
                                    {pix.key}
                                </code>
                                <button
                                    onClick={() => copyToClipboard(pix.key)}
                                    className={`p-2 rounded-lg transition-colors ${copiedKey === pix.key
                                            ? "bg-green-100 text-green-600"
                                            : "bg-secondary text-white hover:bg-secondary/90"
                                        }`}
                                >
                                    {copiedKey === pix.key ? <Check size={18} /> : <Copy size={18} />}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 text-xs mt-6">
                    Que Deus abençoe sua generosidade! 🙏
                </p>
            </div>
        </div>
    );
}
