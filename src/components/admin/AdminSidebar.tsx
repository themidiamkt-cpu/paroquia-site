"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Calendar,
    Bell,
    Users,
    Hammer,
    Inbox,
    LogOut,
    ImageIcon,
    UserCog,
    ChurchIcon
} from "lucide-react";
import { logout } from "@/app/login/actions";
import { useFormStatus } from "react-dom";

// Icons map for easier management
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

export function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden h-screen w-64 sticky top-0 flex-col bg-primary text-white md:flex">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/12 text-sm font-bold">SPX</div>
                    <span className="font-bold uppercase tracking-wider text-sm">Painel Admin</span>
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? "bg-blue-500/30 text-white font-semibold shadow-sm"
                                    : "text-slate-200 hover:bg-white/10 hover:text-white"
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/10 mt-auto">
                <form action={logout}>
                    <LogoutButton />
                </form>
            </div>
        </aside>
    );
}

function LogoutButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2 text-red-200 transition-colors hover:bg-red-500/10 hover:text-red-100 disabled:opacity-60"
        >
            <LogOut size={18} />
            <span className="text-sm font-medium">{pending ? "Saindo..." : "Sair"}</span>
        </button>
    );
}
