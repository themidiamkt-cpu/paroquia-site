
import { getNoticeById } from "@/lib/actions";
import { PageLayout } from "@/components/ui/PageLayout";
import { Calendar, AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function AvisoDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const notice = await getNoticeById(Number(id));

    if (!notice) {
        notFound();
    }

    return (
        <PageLayout title={notice.title}>
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                {notice.image_url && (
                    <div className="w-full h-80 relative bg-gray-100">
                        <img
                            src={notice.image_url}
                            alt={notice.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                <div className="p-8">
                    <div className="flex items-center gap-4 mb-6 text-sm">
                        <span className="flex items-center gap-1 text-gray-500">
                            <Calendar size={16} />
                            {new Date(notice.created_at).toLocaleDateString()}
                        </span>
                        {notice.is_urgent && (
                            <span className="flex items-center gap-1 text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full">
                                <AlertTriangle size={16} /> URGENTE
                            </span>
                        )}
                    </div>

                    <div className="prose max-w-none text-gray-800 leading-relaxed font-sans whitespace-pre-line">
                        {notice.message}
                    </div>

                    {notice.expires_at && (
                        <div className="mt-8 pt-6 border-t font-medium text-sm text-gray-400">
                            Válido até: {new Date(notice.expires_at).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
}
