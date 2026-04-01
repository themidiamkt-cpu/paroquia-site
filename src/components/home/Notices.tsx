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

                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
                    {notices.map((notice) => (
                        <div
                            key={notice.id}
                            className={`rounded-sm border-l-4 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg md:p-6 ${notice.is_urgent ? "border-red-500" : "border-secondary"}`}
                        >
                            <div className="flex justify-between items-center mb-2">
                                <div className="text-[11px] font-bold uppercase tracking-wide text-gray-400 md:text-xs">
                                    {new Date(notice.created_at).toLocaleDateString()}
                                </div>
                                {notice.is_urgent && (
                                    <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800 md:text-xs">URGENTE</span>
                                )}
                            </div>
                            <h3 className="mb-2 line-clamp-2 text-base font-bold text-primary md:mb-3 md:text-lg">
                                {notice.title}
                            </h3>
                            <p className="mb-3 line-clamp-4 text-xs text-gray-600 md:mb-4 md:line-clamp-3 md:text-sm">{notice.message}</p>
                            <Link
                                href={`/avisos/${notice.id}`}
                                className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:underline md:text-sm"
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
