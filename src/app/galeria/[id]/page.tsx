import { notFound } from "next/navigation";
import { CalendarDays, Images } from "lucide-react";
import { getGalleryById, getGalleryImages } from "@/lib/actions";
import { formatDateOnly } from "@/lib/date";
import { PageLayout } from "@/components/ui/PageLayout";
import { GalleryViewer } from "@/components/gallery/GalleryViewer";

export const revalidate = 60;

interface GalleryImage {
    id: number;
    image_url: string;
    display_order: number;
}

export default async function GalleryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const galleryId = Number(id);

    if (!galleryId) {
        notFound();
    }

    const [gallery, images] = await Promise.all([
        getGalleryById(galleryId),
        getGalleryImages(galleryId),
    ]);

    if (!gallery) {
        notFound();
    }

    return (
        <PageLayout
            title={gallery.title}
            subtitle={gallery.description || "Reviva os melhores momentos deste evento."}
            breadcrumbs={[
                { label: "Galeria", href: "/galeria" },
                { label: gallery.title, href: `/galeria/${gallery.id}` },
            ]}
        >
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {gallery.cover_image && (
                        <div className="w-full h-64 md:h-96 bg-gray-100">
                            <img
                                src={gallery.cover_image}
                                alt={gallery.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                            {gallery.event_date && (
                                <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-100">
                                    <CalendarDays size={16} />
                                    {formatDateOnly(gallery.event_date)}
                                </span>
                            )}
                            <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 border border-gray-100">
                                <Images size={16} />
                                {images.length} foto{images.length === 1 ? "" : "s"}
                            </span>
                        </div>

                        {gallery.description && (
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{gallery.description}</p>
                        )}
                    </div>
                </div>

                {images.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-500">
                        Este evento ainda não possui fotos publicadas.
                    </div>
                ) : (
                    <GalleryViewer title={gallery.title} images={images as GalleryImage[]} />
                )}
            </div>
        </PageLayout>
    );
}
