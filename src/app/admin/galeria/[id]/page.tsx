"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    createGalleryImages,
    deleteGalleryImage,
    getGalleryById,
    getGalleryImages,
    reorderGalleryImages,
    setGalleryCover,
    uploadImage,
} from "@/lib/actions";
import { formatDateOnly } from "@/lib/date";
import { ArrowLeft, ExternalLink, GripVertical, ImagePlus, Loader2, Star, Trash } from "lucide-react";

interface Gallery {
    id: number;
    title: string;
    description: string;
    event_date: string | null;
    cover_image: string | null;
}

interface GalleryImage {
    id: number;
    gallery_id: number;
    image_url: string;
    display_order: number;
    created_at: string;
}

async function loadGalleryData(galleryId: number) {
    const [galleryData, imagesData] = await Promise.all([
        getGalleryById(galleryId),
        getGalleryImages(galleryId),
    ]);

    return {
        galleryData: galleryData as Gallery | null,
        imagesData: (imagesData || []) as GalleryImage[],
    };
}

export default function AdminGalleryImagesPage() {
    const params = useParams();
    const galleryIdParam = params?.id;
    const galleryId = Array.isArray(galleryIdParam) ? Number(galleryIdParam[0]) : Number(galleryIdParam);

    const [gallery, setGallery] = useState<Gallery | null>(null);
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState("");
    const [updatingCover, setUpdatingCover] = useState<number | null>(null);
    const [draggingId, setDraggingId] = useState<number | null>(null);
    const [reordering, setReordering] = useState(false);

    useEffect(() => {
        if (!galleryId) return;

        let isMounted = true;

        async function hydratePage() {
            setLoading(true);
            const { galleryData, imagesData } = await loadGalleryData(galleryId);

            if (!isMounted) return;

            setGallery(galleryData);
            setImages(imagesData);
            setLoading(false);
        }

        void hydratePage();

        return () => {
            isMounted = false;
        };
    }, [galleryId]);

    async function refreshData() {
        if (!galleryId) return;

        setLoading(true);
        const { galleryData, imagesData } = await loadGalleryData(galleryId);
        setGallery(galleryData);
        setImages(imagesData);
        setLoading(false);
    }

    async function handleFilesUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files ? Array.from(event.target.files) : [];

        if (!galleryId || files.length === 0) return;

        setUploading(true);
        setUploadProgress(`Enviando 1 de ${files.length}...`);

        try {
            const uploadedUrls: string[] = [];

            for (const [index, file] of files.entries()) {
                setUploadProgress(`Enviando ${index + 1} de ${files.length}...`);

                const data = new FormData();
                data.append("file", file);
                data.append("folder", `galeria/${galleryId}`);

                const url = await uploadImage(data);
                if (url) {
                    uploadedUrls.push(url);
                }
            }

            if (uploadedUrls.length > 0) {
                const formData = new FormData();
                formData.append("gallery_id", String(galleryId));
                formData.append("image_urls", JSON.stringify(uploadedUrls));
                await createGalleryImages(formData);
            }

            await refreshData();
        } catch (error) {
            console.error("Erro ao enviar imagens:", error);
            alert(error instanceof Error ? error.message : "Nao foi possivel enviar as imagens.");
        } finally {
            setUploading(false);
            setUploadProgress("");
            event.target.value = "";
        }
    }

    async function handleDelete(id: number) {
        if (!confirm("Tem certeza que deseja remover esta foto?")) return;
        try {
            await deleteGalleryImage(id);
            await refreshData();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Nao foi possivel excluir a foto.");
        }
    }

    async function handleSetCover(image: GalleryImage) {
        if (!galleryId) return;

        setUpdatingCover(image.id);

        try {
            await setGalleryCover(galleryId, image.image_url);
            await refreshData();
        } catch (error) {
            alert(error instanceof Error ? error.message : "Nao foi possivel definir a capa.");
        } finally {
            setUpdatingCover(null);
        }
    }

    async function handleDropImage(targetId: number) {
        if (!galleryId || draggingId === null || draggingId === targetId) {
            setDraggingId(null);
            return;
        }

        const sourceIndex = images.findIndex((image) => image.id === draggingId);
        const targetIndex = images.findIndex((image) => image.id === targetId);

        if (sourceIndex === -1 || targetIndex === -1) {
            setDraggingId(null);
            return;
        }

        const reorderedImages = [...images];
        const [movedImage] = reorderedImages.splice(sourceIndex, 1);
        reorderedImages.splice(targetIndex, 0, movedImage);

        const normalizedImages = reorderedImages.map((image, index) => ({
            ...image,
            display_order: index + 1,
        }));

        setImages(normalizedImages);
        setDraggingId(null);
        setReordering(true);

        try {
            await reorderGalleryImages(
                galleryId,
                normalizedImages.map((image) => image.id)
            );
        } catch (error) {
            alert(error instanceof Error ? error.message : "Nao foi possivel reordenar as fotos.");
            await refreshData();
        } finally {
            setReordering(false);
        }
    }

    if (!galleryId) {
        return <div className="p-8 text-center">Galeria não encontrada.</div>;
    }

    return (
        <div>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <Link href="/admin/galeria" className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition">
                            <ArrowLeft size={20} />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {gallery?.title || "Gerenciar Fotos"}
                            </h1>
                            <p className="text-sm text-gray-500">
                                {gallery?.event_date ? formatDateOnly(gallery.event_date) : "Data não informada"}
                            </p>
                        </div>
                    </div>

                    {gallery?.description && (
                        <p className="text-sm text-gray-600 max-w-3xl">{gallery.description}</p>
                    )}
                </div>

                <Link
                    href={`/galeria/${galleryId}`}
                    className="inline-flex items-center gap-2 border border-gray-200 bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                >
                    <ExternalLink size={16} /> Ver página pública
                </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h2 className="font-bold text-gray-800">Enviar Fotos</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Selecione várias imagens de uma vez. A primeira enviada vira a capa se o evento ainda não tiver uma.
                        </p>
                    </div>

                    <label className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition cursor-pointer">
                        {uploading ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
                        <span>{uploading ? uploadProgress || "Enviando..." : "Selecionar Fotos"}</span>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFilesUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <h3 className="font-bold text-gray-700">Fotos do Evento ({images.length})</h3>
                    <p className="text-xs text-gray-400">
                        Arraste as fotos para mudar a ordem. Clique em &quot;Definir capa&quot; para escolher a foto principal.
                    </p>
                </div>

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Carregando fotos...</div>
                ) : images.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                        Nenhuma foto enviada ainda.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {images.map((img) => {
                            const isCover = gallery?.cover_image === img.image_url;

                            return (
                                <div
                                    key={img.id}
                                    draggable={!reordering}
                                    onDragStart={() => setDraggingId(img.id)}
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={() => void handleDropImage(img.id)}
                                    onDragEnd={() => setDraggingId(null)}
                                    className={`overflow-hidden rounded-xl border ${isCover ? "border-amber-400 ring-2 ring-amber-200" : "border-gray-200"} bg-white cursor-grab active:cursor-grabbing ${draggingId === img.id ? "opacity-60" : ""}`}
                                >
                                    <div className="relative aspect-[4/3] bg-gray-100">
                                        <img
                                            src={img.image_url}
                                            alt={gallery?.title || "Foto do evento"}
                                            className="w-full h-full object-cover"
                                        />

                                        {isCover && (
                                            <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-amber-950">
                                                <Star size={12} fill="currentColor" /> Capa
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center justify-between rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                                            <span className="inline-flex items-center gap-2">
                                                <GripVertical size={16} />
                                                Arraste para ordenar
                                            </span>
                                            <span>{reordering ? "Salvando..." : `Posicao ${img.display_order}`}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleSetCover(img)}
                                                disabled={isCover || updatingCover === img.id}
                                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100 transition disabled:opacity-50"
                                            >
                                                {updatingCover === img.id ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <Star size={16} />
                                                )}
                                                {isCover ? "Capa atual" : "Definir capa"}
                                            </button>

                                            <button
                                                onClick={() => handleDelete(img.id)}
                                                className="inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-red-700 hover:bg-red-100 transition"
                                                title="Excluir foto"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
