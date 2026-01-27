import { getNotices } from "@/lib/actions";
import { PageLayout } from "@/components/ui/PageLayout";
import { Calendar, AlertTriangle } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

interface Notice {
    id: number;
    title: string;
    message: string;
    image_url?: string;
    is_urgent: boolean;
    created_at: string;
    expires_at?: string;
}

export default async function AvisosPage() {
    const notices = await getNotices() as Notice[];

    return (
        <PageLayout title="Avisos Paroquiais" subtitle="Fique por dentro das novidades e comunicados importantes da nossa paróquia.">
            <div className="max-w-4xl mx-auto">
                {notices.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg">Nenhum aviso disponível no momento.</p>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {notices.map((notice) => (
                            <Link
                                key={notice.id}
                                href={`/avisos/${notice.id}`}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {notice.image_url && (
                                        <div className="md:w-48 h-48 md:h-auto flex-shrink-0 bg-gray-100">
                                            <img
                                                src={notice.image_url}
                                                alt={notice.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}

                                    <div className="flex-1 p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            {notice.is_urgent && (
                                                <span className="flex items-center gap-1 text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-full">
                                                    <AlertTriangle size={12} /> URGENTE
                                                </span>
                                            )}
                                            <span className="flex items-center gap-1 text-gray-400 text-sm">
                                                <Calendar size={14} />
                                                {new Date(notice.created_at).toLocaleDateString("pt-BR")}
                                            </span>
                                        </div>

                                        <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                            {notice.title}
                                        </h2>

                                        <p className="text-gray-600 line-clamp-2">
                                            {notice.message}
                                        </p>

                                        <span className="inline-block mt-4 text-primary font-semibold text-sm group-hover:underline">
                                            Ler mais →
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </PageLayout>
    );
}
