
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

                <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                    {services.map((service) => (
                        <Link
                            key={service.title}
                            href={service.href}
                            className="group rounded-sm border border-gray-100 bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8"
                        >
                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-accent transition-all duration-300 group-hover:bg-primary md:mb-6 md:h-16 md:w-16">
                                <service.icon size={24} className="text-primary transition-colors group-hover:text-white md:h-8 md:w-8" />
                            </div>
                            <h3 className="mb-2 text-base font-bold text-gray-900 transition-colors group-hover:text-primary md:text-xl">{service.title}</h3>
                            <p className="text-xs text-gray-500 md:text-sm">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
