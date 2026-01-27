import { ArrowRight, Bell } from "lucide-react";
import Link from "next/link";
import { getNotices } from "@/lib/actions";

export async function Notices() {
    const allNotices = await getNotices();
    // Filter active notices (not expired) and take top 3
    const notices = allNotices
        .filter(n => !n.expires_at || new Date(n.expires_at) > new Date())
        .slice(0, 3);

    if (notices.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center gap-3">
                    <Bell className="text-secondary" /> Avisos Paroquiais
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`bg-white p-6 rounded-sm shadow-sm border-l-4 ${notice.is_urgent ? 'border-red-500' : 'border-secondary'} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                                    {new Date(notice.created_at).toLocaleDateString()}
                                </div>
                                {notice.is_urgent && (
                                    <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-bold">URGENTE</span>
                                )}
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-3 line-clamp-2">
                                {notice.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{notice.message}</p>
                            <Link
                                href={`/avisos/${notice.id}`}
                                className="text-secondary text-sm font-bold hover:underline inline-flex items-center gap-1"
                            >
                                Saiba mais <ArrowRight size={14} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
