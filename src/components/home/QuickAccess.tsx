
import Link from "next/link";
import { Clock, Calendar, Bell, Heart, Baby, Users, Phone } from "lucide-react";

const actions = [
    { name: "Horários", href: "/horarios", icon: Clock, color: "bg-blue-50 text-blue-600" },
    { name: "Agenda", href: "/agenda", icon: Calendar, color: "bg-green-50 text-green-600" },
    { name: "Avisos", href: "/avisos", icon: Bell, color: "bg-yellow-50 text-yellow-600" },
    { name: "Intenções", href: "/intencao-missa", icon: Heart, color: "bg-red-50 text-red-600" },
    { name: "Catequese", href: "/catequese", icon: Users, color: "bg-purple-50 text-purple-600" },
    { name: "Batismo", href: "/batismo", icon: Baby, color: "bg-teal-50 text-teal-600" },
    { name: "Contato", href: "/contato", icon: Phone, color: "bg-gray-50 text-gray-600" },
];

export function QuickAccess() {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Acesso Rápido</h2>
                    <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {actions.map((action) => (
                        <Link
                            key={action.name}
                            href={action.href}
                            className="flex flex-col items-center justify-center p-4 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 group bg-white border border-gray-100"
                        >
                            <div className={`p-3 rounded-full mb-3 ${action.color} group-hover:scale-110 transition-transform`}>
                                <action.icon size={24} />
                            </div>
                            <span className="text-sm font-medium text-gray-700">{action.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
