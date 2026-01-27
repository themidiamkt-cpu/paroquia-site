"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, Facebook, Instagram, Phone, Mail } from "lucide-react";

const navigation = [
    { name: "Início", href: "/" },
    { name: "A Paróquia", href: "/a-paroquia" },
    { name: "Horários", href: "/horarios" },
    { name: "Sacramentos", href: "/sacramentos" },
    { name: "Pastorais", href: "/pastorais" },
    { name: "Comunidades", href: "/comunidades" },
    { name: "Avisos", href: "/avisos" },
    { name: "Agenda", href: "/agenda" },
    { name: "Festa Junina", href: "/festa-junina" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="bg-primary sticky top-0 z-50 shadow-md font-sans text-white">
            {/* Top Bar - Clean and Minimal */}
            <div className="bg-primary border-b border-white/10 py-2 text-xs text-gray-300 hidden md:block">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-1"><Phone size={12} /> (19) 3261-2099</span>
                        <span className="flex items-center gap-1"><Mail size={12} /> saopiox@arquidiocesecampinas.com</span>
                    </div>
                    <div className="flex gap-3">
                        <Link href="https://instagram.com/piox.pspx" target="_blank" className="hover:text-secondary transition-colors"><Instagram size={14} /></Link>
                        <Link href="https://facebook.com" target="_blank" className="hover:text-secondary transition-colors"><Facebook size={14} /></Link>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <nav className="container mx-auto px-4 py-4" aria-label="Global">
                <div className="flex items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-3">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="relative h-12 w-12">
                                    <Image
                                        src="/logo.png"
                                        alt="Brasão da Paróquia São Pio X"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white leading-none tracking-tight">Paróquia São Pio X</span>
                                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Campinas / SP</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Abrir menu</span>
                            {mobileMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-6 items-center">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-white hover:text-secondary transition-colors"
                                style={{ fontSize: '13px' }}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contato"
                            className="bg-secondary text-white px-5 py-2 rounded-sm text-sm font-bold hover:bg-white hover:text-primary transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                            Contato
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-primary border-t border-white/10 shadow-lg z-50">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-white/10 hover:text-secondary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/contato"
                            className="block rounded-md px-3 py-2 text-base font-bold text-secondary hover:bg-white/10"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contato
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
