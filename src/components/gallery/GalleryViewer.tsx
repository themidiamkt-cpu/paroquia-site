"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
    id: number;
    image_url: string;
    display_order: number;
}

interface GalleryViewerProps {
    title: string;
    images: GalleryImage[];
}

export function GalleryViewer({ title, images }: GalleryViewerProps) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        if (activeIndex === null) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActiveIndex(null);
                return;
            }

            if (event.key === "ArrowRight") {
                setActiveIndex((current) => {
                    if (current === null) return 0;
                    return current === images.length - 1 ? 0 : current + 1;
                });
            }

            if (event.key === "ArrowLeft") {
                setActiveIndex((current) => {
                    if (current === null) return 0;
                    return current === 0 ? images.length - 1 : current - 1;
                });
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeIndex, images.length]);

    function openImage(index: number) {
        setActiveIndex(index);
    }

    function closeViewer() {
        setActiveIndex(null);
    }

    function showPrevious() {
        setActiveIndex((current) => {
            if (current === null) return 0;
            return current === 0 ? images.length - 1 : current - 1;
        });
    }

    function showNext() {
        setActiveIndex((current) => {
            if (current === null) return 0;
            return current === images.length - 1 ? 0 : current + 1;
        });
    }

    const activeImage = activeIndex !== null ? images[activeIndex] : null;

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {images.map((image, index) => (
                    <button
                        key={image.id}
                        type="button"
                        onClick={() => openImage(index)}
                        className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-left"
                    >
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                            <img
                                src={image.image_url}
                                alt={`${title} - foto ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>
                    </button>
                ))}
            </div>

            {activeImage && (
                <div className="fixed inset-0 z-[70] bg-black/90 p-4 md:p-8 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={closeViewer}
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
                    >
                        <X size={22} />
                    </button>

                    {images.length > 1 && (
                        <>
                            <button
                                type="button"
                                onClick={showPrevious}
                                className="absolute left-4 md:left-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                type="button"
                                onClick={showNext}
                                className="absolute right-4 md:right-8 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    <div className="w-full max-w-6xl">
                        <div className="overflow-hidden rounded-2xl bg-black">
                            <img
                                src={activeImage.image_url}
                                alt={`${title} - foto ${activeIndex + 1}`}
                                className="w-full max-h-[82vh] object-contain"
                            />
                        </div>

                        <div className="mt-4 text-center text-sm text-white/80">
                            {activeIndex + 1} de {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
