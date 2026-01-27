
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-primary text-white pt-20 pb-10 font-sans border-t-[6px] border-secondary">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Identity */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative h-14 w-14 flex items-center justify-center">
                                <Image
                                    src="/logo.png"
                                    alt="Brasão Paróquia São Pio X"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className="text-lg font-bold uppercase block leading-none tracking-tight">Paróquia São Pio X</span>
                                <span className="text-[10px] text-gray-300 uppercase tracking-widest">Arquidiocese de Campinas</span>
                            </div>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            Uma comunidade de fé, esperança e caridade. Venha participar de nossas missas e eventos e fortalecer sua caminhada cristã.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://instagram.com/piox.pspx" target="_blank" className="bg-white/10 p-2.5 rounded-full hover:bg-secondary hover:text-white transition-all transform hover:scale-110">
                                <Instagram size={20} />
                            </Link>
                            <Link href="https://facebook.com" target="_blank" className="bg-white/10 p-2.5 rounded-full hover:bg-secondary hover:text-white transition-all transform hover:scale-110">
                                <Facebook size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Quick Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-secondary">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-300">
                                <MapPin className="text-secondary shrink-0 mt-1" size={18} />
                                <span className="text-sm">
                                    R. Eudes Batista Ribeiro, S/N<br />
                                    Jardim Santa Rosa<br />
                                    Campinas – SP, 13058-712
                                </span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <Phone className="text-secondary shrink-0 mt-1" size={18} />
                                <div className="text-sm">
                                    <span className="block">(19) 3261-2099</span>
                                    <span className="text-xs text-gray-500">Secretaria e WhatsApp</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3 text-gray-300">
                                <Mail className="text-secondary shrink-0 mt-1" size={18} />
                                <span className="text-sm">saopiox@arquidiocesecampinas.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Schedule */}
                    <div>
                        <h4 className="font-bold text-lg mb-6 text-secondary">Horários de Missa</h4>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Quarta-feira</span>
                                <span className="font-bold text-white">15h</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Quinta-feira</span>
                                <span className="font-bold text-white">20h</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Sábado</span>
                                <span className="font-bold text-white">20h</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>Domingo</span>
                                <span className="font-bold text-white">09h15</span>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-6 text-white border-b border-gray-600 pb-2 inline-block">Links Rápidos</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><Link href="/horarios" className="hover:text-secondary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-secondary rounded-full"></div> Horários de Missa</Link></li>
                            <li><Link href="/batismo" className="hover:text-secondary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-secondary rounded-full"></div> Agendar Batismo</Link></li>
                            <li><Link href="/catequese" className="hover:text-secondary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-secondary rounded-full"></div> Inscrição Catequese</Link></li>
                            <li><Link href="/intencao-missa" className="hover:text-secondary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-secondary rounded-full"></div> Intenção de Missa</Link></li>
                            <li><Link href="/contato" className="hover:text-secondary transition-colors flex items-center gap-2"><div className="w-1 h-1 bg-secondary rounded-full"></div> Fale Conosco</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Reform */}
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                        <h3 className="text-lg font-bold mb-4 text-white">Reforma da Capela</h3>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            Ajude-nos a construir um novo espaço para nossa comunidade. Cada contribuição é fundamental.
                        </p>
                        <Link href="/reforma" className="group w-full bg-secondary text-white px-4 py-3 rounded-sm font-bold hover:bg-white hover:text-primary transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                            QUERO AJUDAR
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Paróquia São Pio X. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacidade</Link>
                        <Link href="#" className="hover:text-white transition-colors">Termos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
