
import { PageLayout } from "@/components/ui/PageLayout";
import { GenericForm } from "@/components/ui/GenericForm";
import { MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";

export default function ContactPage() {
    return (
        <PageLayout
            title="Contato"
            subtitle="Entre em contato com a secretaria paroquial"
            breadcrumbs={[{ label: "Contato", href: "/contato" }]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div className="space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-primary mb-6">Informações de Contato</h2>
                        <div className="space-y-6">

                            {/* Address */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-accent p-3 rounded-sm text-secondary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Endereço</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        Paróquia São Pio X<br />
                                        R. Eudes Batista Ribeiro, S/N<br />
                                        Jardim Santa Rosa<br />
                                        Campinas – SP<br />
                                        CEP: 13058-712
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-accent p-3 rounded-sm text-secondary">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Telefone e WhatsApp</h3>
                                    <p className="text-xl font-bold text-primary group-hover:text-secondary transition-colors">
                                        (19) 3261-2099
                                    </p>
                                    <div className="flex items-center gap-2 mt-2 text-red-500 text-xs bg-red-50 p-2 rounded-sm border border-red-100">
                                        <AlertCircle size={14} />
                                        <span>Não recebemos ligações via WhatsApp.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex gap-4 items-start">
                                <div className="bg-accent p-3 rounded-sm text-secondary">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Horário de Atendimento</h3>
                                    <div className="space-y-1 text-gray-600 text-sm">
                                        <p><strong>Segunda a Sexta:</strong> 08h às 12h | 13h às 17h</p>
                                        <p><strong>Sábado:</strong> 08h às 12h</p>
                                        <p className="text-red-500 text-xs mt-1">* Não há atendimento em feriados.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Map (Placeholder) */}
                    <section className="h-64 bg-gray-200 rounded-sm overflow-hidden relative border border-gray-300">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-medium">
                            Mapa do Google - Localização
                        </div>
                    </section>
                </div>

                {/* Contact Form */}
                <div>
                    <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-secondary">
                        <h3 className="text-xl font-bold text-primary mb-2">Envie uma Mensagem</h3>
                        <p className="text-gray-600 mb-6 text-sm">Use o formulário abaixo para dúvidas gerais. Para agendamentos e urgências, ligue para a secretaria.</p>

                        <GenericForm
                            formName="contato"
                            fields={[
                                { name: "name", label: "Nome Completo", type: "text", required: true },
                                { name: "email", label: "E-mail", type: "email", required: true },
                                { name: "phone", label: "Telefone", type: "tel", required: true },
                                { name: "subject", label: "Assunto", type: "text", required: true },
                                { name: "message", label: "Mensagem", type: "textarea", required: true }
                            ]}
                            submitLabel="Enviar Mensagem"
                            successMessage="Sua mensagem foi enviada com sucesso! Em breve entraremos em contato."
                        />
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
