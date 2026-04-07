import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin, Calendar, ArrowRight } from "lucide-react";
import { getBanners } from "@/lib/actions";
import { HeroCarousel } from "./HeroCarousel";
import { MATRIZ_MASS_SCHEDULE, PARISH_CONTACT, SECRETARY_SCHEDULE } from "@/lib/parish-info";

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
                                &ldquo;Restaurar todas as coisas em Cristo&rdquo;. Uma comunidade acolhedora esperando por você e sua família.
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
                <div className="grid grid-cols-3 gap-2 md:gap-6">
                    <div className="min-w-0 rounded-sm border-l-[3px] border-secondary bg-white p-3 shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:border-l-4 md:p-8">
                        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-4 md:text-left">
                            <div className="bg-accent p-2.5 rounded-full text-secondary shrink-0 md:p-3">
                                <Clock className="h-5 w-5 md:h-7 md:w-7" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="mb-2 text-sm font-bold text-primary md:text-xl">Missas</h3>
                                <ul className="space-y-1 text-[10px] leading-4 text-gray-600 md:text-sm md:space-y-1.5">
                                    {MATRIZ_MASS_SCHEDULE.map((item) => (
                                        <li key={`mobile-${item.label}`} className="md:hidden">
                                            {item.shortLabel}: {item.time}
                                        </li>
                                    ))}
                                    {MATRIZ_MASS_SCHEDULE.map((item) => (
                                        <li key={item.label} className="hidden w-full justify-between gap-8 md:flex">
                                            <span>{item.label}:</span>
                                            <span className="font-medium text-gray-900">{item.time}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 rounded-sm border-l-[3px] border-primary bg-white p-3 shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:border-l-4 md:p-8">
                        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-4 md:text-left">
                            <div className="bg-accent p-2.5 rounded-sm text-secondary shrink-0 md:p-3">
                                <MapPin className="h-5 w-5 md:h-7 md:w-7" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="mb-2 text-sm font-bold text-primary md:text-xl">Localização</h3>
                                <p className="mb-2 text-[10px] leading-4 text-gray-600 md:hidden">
                                    Jd. Santa Rosa<br />
                                    Campinas - SP
                                </p>
                                <p className="hidden text-sm leading-relaxed text-gray-600 md:mb-3 md:block">
                                    {PARISH_CONTACT.addressLine1}<br />
                                    {PARISH_CONTACT.addressLine2}<br />
                                    {PARISH_CONTACT.cityLine}
                                </p>
                                <Link href="/contato" className="inline-flex items-center gap-1 text-[10px] font-bold text-secondary transition-colors hover:underline md:text-sm">
                                    <span className="md:hidden">Mapa</span>
                                    <span className="hidden md:inline">Ver no mapa</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="min-w-0 rounded-sm border-l-[3px] border-secondary bg-white p-3 shadow-xl transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl md:border-l-4 md:p-8">
                        <div className="flex flex-col items-center gap-3 text-center md:flex-row md:items-start md:gap-4 md:text-left">
                            <div className="bg-accent p-2.5 rounded-sm text-secondary shrink-0 md:p-3">
                                <Calendar className="h-5 w-5 md:h-7 md:w-7" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="mb-2 text-sm font-bold text-primary md:text-xl">Secretaria</h3>
                                <p className="mb-1 text-[10px] leading-4 text-gray-600 md:hidden">
                                    {SECRETARY_SCHEDULE.weekdayShortLabel}: 08h-12h<br />
                                    13h-17h<br />
                                    {SECRETARY_SCHEDULE.saturdayShortLabel}: 08h-12h
                                </p>
                                <p className="hidden text-sm text-gray-600 md:mb-1 md:block">
                                    <strong>{SECRETARY_SCHEDULE.weekdayLabel}:</strong> 08h-12h, 13h-17h<br />
                                    <strong>{SECRETARY_SCHEDULE.saturdayLabel}:</strong> 08h-12h
                                </p>
                                <p className="mt-2 flex items-center justify-center gap-2 text-[10px] font-medium text-gray-900 md:justify-start md:text-sm">
                                    {PARISH_CONTACT.phone}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
