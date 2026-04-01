import Link from "next/link";
import { ArrowRight, CalendarDays, ImageIcon } from "lucide-react";
import { getGalleries } from "@/lib/actions";
import { formatDateOnly } from "@/lib/date";
import { PageLayout } from "@/components/ui/PageLayout";

export const revalidate = 60;

interface Gallery {
    id: number;
    title: string;
    description: string;
    event_date: string | null;
    cover_image: string | null;
}

export default async function GaleriaPage() {
    const galleries = await getGalleries() as Gallery[];

    return (
        <PageLayout
            title="Galeria de Eventos"
            subtitle="Encontre os álbuns dos principais momentos da vida paroquial."
            breadcrumbs={[{ label: "Galeria", href: "/galeria" }]}
        >
            <div className="max-w-6xl mx-auto">
                {galleries.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                        Nenhum álbum disponível no momento.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {galleries.map((gallery) => (
                            <Link
                                key={gallery.id}
                                href={`/galeria/${gallery.id}`}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="h-56 bg-gray-100 overflow-hidden">
                                    {gallery.cover_image ? (
                                        <img
                                            src={gallery.cover_image}
                                            alt={gallery.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-3">
                                            <ImageIcon size={42} />
                                            <span className="text-sm">Álbum sem capa</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary mb-3">
                                        <CalendarDays size={14} />
                                        {gallery.event_date ? formatDateOnly(gallery.event_date) : "Data não informada"}
                                    </div>

                                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                                        {gallery.title}
                                    </h2>

                                    <p className="mt-3 text-sm text-gray-600 line-clamp-3 min-h-[60px]">
                                        {gallery.description || "Clique para ver as fotos deste evento."}
                                    </p>

                                    <span className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-secondary group-hover:gap-3 transition-all">
                                        Ver fotos <ArrowRight size={15} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
