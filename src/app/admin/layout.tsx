
import Link from "next/link";
import { LayoutDashboard, FileText, Calendar, Clock, Bell, Users, Hammer, Inbox, LogOut, ImageIcon, BookOpen, Image, UserCog, ChurchIcon } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    // Simple layout, auth check would go here in middleware or useEffect

    const menuItems = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Agenda", href: "/admin/agenda", icon: Calendar },
        { name: "Missas", href: "/admin/missas", icon: ChurchIcon },
        { name: "Comunidades", href: "/admin/comunidades", icon: Users },
        { name: "Avisos", href: "/admin/avisos", icon: Bell },
        { name: "Pastorais", href: "/admin/pastorais", icon: Users },
        { name: "Reforma", href: "/admin/reforma", icon: Hammer },
        { name: "Galeria", href: "/admin/galeria", icon: ImageIcon },
        { name: "Formulários (Recebidos)", href: "/admin/formularios", icon: Inbox },
        { name: "Gerenciar Formulários", href: "/admin/formularios/gerenciar", icon: FileText },
        { name: "Usuários", href: "/admin/usuarios", icon: UserCog },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <aside className="w-64 bg-secondary text-white hidden md:flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-8 w-8 bg-white/10 rounded-full flex items-center justify-center font-bold text-sm">SPX</div>
                        <span className="font-bold uppercase tracking-wider text-sm">Painel Admin</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
                        >
                            <item.icon size={18} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-2 text-red-300 hover:text-red-200 w-full">
                        <LogOut size={18} />
                        <span className="text-sm font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <header className="bg-white border-b border-gray-200 py-4 px-6 md:hidden">
                    <span className="font-bold text-secondary">Painel Admin</span>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
