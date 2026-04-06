import Link from "next/link";
import { ArrowRight, CalendarDays, ImageIcon } from "lucide-react";
import { getGalleries } from "@/lib/actions";
import { formatDateOnly } from "@/lib/date";

interface Gallery {
    id: number;
    created_at: string;
    title: string;
    description: string;
    event_date: string | null;
    cover_image: string | null;
}

export async function RecentGallery() {
    const galleries = (await getGalleries()) as Gallery[];
    const recentGalleries = [...galleries]
        .sort((first, second) => {
            const eventDateComparison = (second.event_date || "").localeCompare(first.event_date || "");

            if (eventDateComparison !== 0) {
                return eventDateComparison;
            }

            return (second.created_at || "").localeCompare(first.created_at || "");
        })
        .slice(0, 3);

    if (recentGalleries.length === 0) {
        return null;
    }

    return (
        <section className="py-20 bg-accent/30">
            <div className="container mx-auto px-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Momentos</span>
                        <h2 className="text-3xl font-bold text-primary">Galeria de Eventos</h2>
                        <p className="text-gray-500 mt-2 max-w-2xl">
                            Veja os álbuns mais recentes com os momentos especiais da nossa paróquia.
                        </p>
                    </div>

                    <Link
                        href="/galeria"
                        className="inline-flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all"
                    >
                        Ver toda a galeria <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {recentGalleries.map((gallery) => (
                        <Link
                            key={gallery.id}
                            href={`/galeria/${gallery.id}`}
                            className="group overflow-hidden rounded-xl border border-white/70 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="h-60 bg-gray-100 overflow-hidden">
                                {gallery.cover_image ? (
                                    <img
                                        src={gallery.cover_image}
                                        alt={gallery.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                                            <ImageIcon size={44} />
                                            <span className="text-sm">Álbum sem capa</span>
                                        </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary mb-3">
                                    <CalendarDays size={14} />
                                    {gallery.event_date ? formatDateOnly(gallery.event_date) : "Data nao informada"}
                                </div>

                                <h3 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors">
                                    {gallery.title}
                                </h3>

                                <p className="mt-3 text-sm text-gray-600 line-clamp-3 min-h-[60px]">
                                    {gallery.description || "Clique para abrir este álbum de fotos."}
                                </p>

                                <span className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                                    Abrir álbum <ArrowRight size={15} />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
