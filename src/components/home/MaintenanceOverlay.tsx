"use client";

import { useState, useEffect } from "react";
import { Lock, Heart, Church } from "lucide-react";

export function MaintenanceOverlay({ children }: { children: React.ReactNode }) {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const authorized = localStorage.getItem("spx_maintenance_authorized");
        if (authorized === "true") {
            setIsAuthorized(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === "Pascompspx2026") {
            localStorage.setItem("spx_maintenance_authorized", "true");
            setIsAuthorized(true);
            setError(false);
        } else {
            setError(true);
            setPassword("");
        }
    };

    if (!mounted) return null;

    if (isAuthorized) {
        return <>{children}</>;
    }

    return (
        <div className="min-h-screen bg-[#0a1e33] flex flex-col items-center justify-center p-6 text-white text-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-sm">
                <div className="mb-8 animate-bounce">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mx-auto border border-white/20 shadow-2xl">
                        <Church size={48} className="text-amber-400" />
                    </div>
                </div>

                <h1 className="text-4xl font-black mb-2 tracking-tight">
                    Em Criação<span className="text-amber-400">...</span>
                </h1>
                <p className="text-white/60 mb-10 font-medium">
                    Estamos preparando algo especial para você. <br /> Em breve, o novo site da Paróquia São Pio X estará no ar!
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                        <input
                            type="password"
                            placeholder="Senha de acesso"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full bg-white/5 border ${error ? "border-red-500/50" : "border-white/10"} hover:border-white/20 focus:border-amber-400/50 rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-white/20 text-center font-medium`}
                        />
                    </div>
                    {error && (
                        <p className="text-red-400 text-xs font-bold animate-pulse">Senha incorreta. Tente novamente.</p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]"
                    >
                        Acessar Dashboard
                    </button>
                </form>

                <div className="mt-12 flex items-center justify-center gap-2 text-white/20 text-xs">
                    <span>Feito com</span>
                    <Heart size={12} className="text-red-500/40 fill-red-500/20" />
                    <span>pela PASCOM SPX</span>
                </div>
            </div>
        </div>
    );
}
