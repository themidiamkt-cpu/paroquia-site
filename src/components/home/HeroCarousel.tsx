"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface Banner {
    id: number;
    title: string;
    image_url: string;
    link: string | null;
}

export function HeroCarousel({ banners }: { banners: Banner[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (banners.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % banners.length);
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);

    if (banners.length === 0) return null;

    const currentBanner = banners[currentIndex];

    return (
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden bg-black">
            {/* Background Image with Animate fade */}
            <div className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out">
                {banners.map((banner, index) => (
                    <div
                        key={banner.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={banner.image_url}
                            alt={banner.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent"></div>
                    </div>
                ))}
            </div>

            <div className="relative z-20 container mx-auto px-4 flex items-center justify-between">
                {banners.length > 1 && (
                    <button onClick={prevSlide} className="p-2 text-white/50 hover:text-white transition">
                        <ChevronLeft size={32} />
                    </button>
                )}

                <div className="max-w-3xl flex-1 mx-8">
                    <div key={currentIndex} className="animate-in fade-in slide-in-from-left duration-700">
                        <span className="text-secondary font-bold tracking-widest uppercase mb-4 block text-sm">
                            Paróquia São Pio X
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
                            {currentBanner.title}
                        </h1>

                        {currentBanner.link && (
                            <div className="flex gap-4">
                                <Link
                                    href={currentBanner.link}
                                    className="bg-secondary hover:bg-secondary/90 text-white font-bold py-3 px-8 rounded-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    Saiba Mais <ArrowRight size={18} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {banners.length > 1 && (
                    <button onClick={nextSlide} className="p-2 text-white/50 hover:text-white transition">
                        <ChevronRight size={32} />
                    </button>
                )}
            </div>

            {/* Dots */}
            {banners.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white"
                                }`}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
