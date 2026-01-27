import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { getBanners } from "@/lib/actions";
import { HeroCarousel } from "./HeroCarousel";

export async function Hero() {
    const banners = await getBanners();
    const activeBanners = banners.filter(b => b.active);

    return (
        <div className="relative">
            {activeBanners.length > 0 ? (
                <HeroCarousel banners={activeBanners} />
            ) : (
                <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/hero-banner-v3.jpg"
                            alt="Vista aérea da Paróquia São Pio X"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay for better readability without hiding the image */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
                    </div>

                    <div className="relative z-20 container mx-auto px-4">
                        <div className="max-w-3xl animate-in fade-in slide-in-from-left duration-1000">
                            <span className="text-secondary font-bold tracking-widest uppercase mb-4 block text-sm">Paróquia São Pio X</span>
                            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
                                SEJAM <br />
                                BEM-VINDOS
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 font-light text-gray-100 max-w-2xl drop-shadow-md">
                                "Restaurar todas as coisas em Cristo". Uma comunidade acolhedora esperando por você e sua família.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/horarios"
                                    className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 border border-primary/20 backdrop-blur-sm"
                                >
                                    Horários de Missa
                                </Link>
                                <Link
                                    href="/contato"
                                    className="bg-secondary text-white hover:bg-secondary/90 font-bold py-4 px-10 rounded-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    Contato
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Floating Info Cards */}
            <div className="relative z-30 container mx-auto px-4 -mt-24 mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-sm shadow-xl border-l-4 border-secondary transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-accent p-3 rounded-full text-secondary shrink-0">
                                <Clock size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Missas</h3>
                                <ul className="text-gray-600 text-sm space-y-1.5">
                                    <li className="flex justify-between w-full gap-8"><span>Quarta / Quinta:</span> <span className="font-medium text-gray-900">15h / 20h</span></li>
                                    <li className="flex justify-between w-full gap-8"><span>Sábado:</span> <span className="font-medium text-gray-900">20h00</span></li>
                                    <li className="flex justify-between w-full gap-8"><span>Domingo:</span> <span className="font-medium text-gray-900">09h15</span></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-sm shadow-xl border-l-4 border-primary transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-accent p-3 rounded-sm text-secondary shrink-0">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Localização</h3>
                                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                                    R. Eudes Batista Ribeiro, S/N<br />
                                    Jardim Santa Rosa<br />
                                    Campinas – SP, 13058-712
                                </p>
                                <Link href="/contato" className="text-secondary text-sm font-bold hover:underline inline-flex items-center gap-1 transition-colors">
                                    Ver no mapa <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-sm shadow-xl border-l-4 border-secondary transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                        <div className="flex items-start gap-4">
                            <div className="bg-accent p-3 rounded-sm text-secondary shrink-0">
                                <Calendar size={28} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Secretaria</h3>
                                <p className="text-gray-600 text-sm mb-1">
                                    <strong>Seg-Sex:</strong> 08h-12h, 13h-17h<br />
                                    <strong>Sábado:</strong> 08h-12h
                                </p>
                                <p className="text-gray-900 font-medium text-sm mt-2 flex items-center gap-2">
                                    (19) 3261-2099
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
