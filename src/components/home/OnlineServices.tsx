
import Link from "next/link";
import { CalendarDays, FileText, Heart, MessageCircle } from "lucide-react";

const services = [
    {
        title: "Intenção de Missa",
        description: "Envie suas intenções para as celebrações semanais.",
        icon: FileText,
        href: "/intencao-missa",
    },
    {
        title: "Agendar Batismo",
        description: "Inicie o processo de batismo para seu filho(a) ou afilhado(a).",
        icon: Heart,
        href: "/batismo",
    },
    {
        title: "Catequese",
        description: "Inscreva-se nas turmas de catequese infantil e crisma.",
        icon: CalendarDays,
        href: "/catequese",
    },
    {
        title: "Fale Conosco",
        description: "Tire dúvidas, envie sugestões ou converse com a secretaria.",
        icon: MessageCircle,
        href: "/contato",
    },
];

export function OnlineServices() {
    return (
        <section className="py-20 bg-accent">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Facilidade</span>
                    <h2 className="text-3xl font-bold text-primary">Serviços Online</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Realize solicitações e agendamentos sem sair de casa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className="bg-white p-8 rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group text-center hover:-translate-y-1"
                        >
                            <div className="bg-accent w-16 h-16 rounded-sm flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-300">
                                <service.icon size={32} className="text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                            <p className="text-sm text-gray-500">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
