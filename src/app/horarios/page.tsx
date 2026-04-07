
import { PageLayout } from "@/components/ui/PageLayout";
import { Clock, Calendar, Info } from "lucide-react";
import { MATRIZ_MASS_SCHEDULE, PARISH_CONTACT, SECRETARY_SCHEDULE } from "@/lib/parish-info";

export default function SchedulePage() {
    return (
        <PageLayout
            title="Horários"
            subtitle="Fique atento aos horários de nossas celebrações e atendimentos"
            breadcrumbs={[{ label: "Horários", href: "/horarios" }]}
        >
            <div className="space-y-12">

                {/* Mass Schedule */}
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="bg-secondary p-2 rounded-sm text-white">
                            <Clock size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-primary">Santa Missa e Novenas</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {MATRIZ_MASS_SCHEDULE.map((item) => (
                            <div
                                key={item.label}
                                className={`bg-white p-6 rounded-sm shadow-sm border-t-4 hover:shadow-md transition-shadow ${
                                    item.label === "Domingo" ? "border-secondary bg-accent/20" : "border-primary"
                                }`}
                            >
                                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest block mb-1">{item.label}</span>
                                <span className={`text-3xl font-bold block mb-3 ${item.label === "Domingo" ? "text-secondary" : "text-primary"}`}>
                                    {item.time}
                                </span>
                                <p className="text-sm text-gray-600">
                                    {item.label === "Quarta-feira" && "Santa Missa com Novena do Perpétuo Socorro"}
                                    {item.label === "Quinta-feira" && "Santa Missa com Novena de N. Sra. Desatadora dos Nós e Adoração"}
                                    {item.label === "Sábado" && "Santa Missa Dominical (Vigília)"}
                                    {item.label === "Domingo" && "Santa Missa Dominical"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Priest Schedule */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-secondary p-2 rounded-sm text-white">
                                <Info size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-primary">Atendimentos com Pe. Leandro</h2>
                                <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Agendamento prévio</span>
                            </div>
                        </div>
                        <div className="bg-accent p-6 rounded-sm border border-secondary/20">
                            <p className="text-gray-700 mb-4 text-sm">
                                Agenda para confissões, aconselhamentos e direcionamentos espirituais.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-bold text-primary">Terças-feiras</span>
                                    <span className="text-gray-800">08h às 12h | 14h às 17h</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-bold text-primary">Quintas-feiras</span>
                                    <span className="text-gray-800">08h às 12h | 14h às 17h</span>
                                </li>
                                <li className="flex justify-between border-b border-gray-200 pb-2">
                                    <span className="font-bold text-primary">Sábados</span>
                                    <span className="text-gray-800">08h às 12h</span>
                                </li>
                            </ul>
                            <div className="mt-4 bg-white/50 p-3 rounded-sm text-center">
                                <p className="text-sm font-bold text-primary">Agendamento Prévio Necessário</p>
                                <p className="text-sm text-gray-600">Ligue ou mande mensagem: {PARISH_CONTACT.phone}</p>
                            </div>
                        </div>
                    </section>

                    {/* Secretary Schedule */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-secondary p-2 rounded-sm text-white">
                                <Calendar size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-primary">Secretaria Paroquial</h2>
                        </div>
                        <div className="bg-white border border-gray-200 p-6 rounded-sm">
                            <ul className="space-y-4">
                                <li className="flex justify-between pb-2">
                                    <span className="font-bold text-gray-600">{SECRETARY_SCHEDULE.weekdayLabel}</span>
                                    <div className="text-right">
                                        <span className="block text-primary font-bold">{SECRETARY_SCHEDULE.morning}</span>
                                        <span className="block text-primary font-bold">{SECRETARY_SCHEDULE.afternoon}</span>
                                    </div>
                                </li>
                                <li className="flex justify-between border-t border-gray-100 pt-2">
                                    <span className="font-bold text-gray-600">{SECRETARY_SCHEDULE.saturdayLabel}</span>
                                    <div className="text-right">
                                        <span className="block text-primary font-bold">{SECRETARY_SCHEDULE.saturdayHours}</span>
                                    </div>
                                </li>
                            </ul>
                            <div className="mt-6 space-y-2 text-sm text-gray-500 bg-gray-50 p-4 rounded-sm">
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    Não recebemos ligações pelo WhatsApp. Use apenas para mensagens.
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                    Não há atendimento em feriados.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PageLayout>
    );
}
