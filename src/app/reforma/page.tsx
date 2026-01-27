
import { PageLayout } from "@/components/ui/PageLayout";
import { GenericForm } from "@/components/ui/GenericForm";
import { Hammer, CheckCircle2, CircleDashed } from "lucide-react";

export default function ReformPage() {
    return (
        <PageLayout
            title="Reforma da Capela"
            subtitle="Acompanhe o andamento da construção da casa de Deus e saiba como ajudar"
            breadcrumbs={[{ label: "Reforma", href: "/reforma" }]}
        >
            <div className="space-y-16">

                {/* Project Presentation */}
                <section className="bg-white p-8 rounded-sm shadow-sm border-t-4 border-secondary">
                    <h2 className="text-2xl font-bold text-primary mb-6">O Projeto</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p className="lead text-lg">
                            "Se o Senhor não construir a casa, em vão trabalham os construtores" (Sl 126).
                        </p>
                        <p>
                            Nossa comunidade tem o sonho e a necessidade de reformar e ampliar nossa capela, para melhor acolher os fiéis e celebrar
                            dignamente os sacramentos. Esta obra não é apenas de tijolos, mas de fé e união de toda a Paróquia São Pio X.
                        </p>
                        <p>
                            Contamos com a generosidade de cada paroquiano, seja através do dízimo, de doações espontâneas ou da participação
                            em nossas quermesses e eventos. Juntos, construiremos um espaço de oração e evangelização.
                        </p>
                    </div>
                </section>

                {/* Stages */}
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-8">Etapas da Obra</h2>
                    <div className="space-y-6">
                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 p-2 rounded-full text-green-600 shrink-0 mt-1">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">1. Fundação e Estrutura</h3>
                                <p className="text-gray-600 text-sm">Concluído. Alicerces firmes para sustentar a nova nave da igreja.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="bg-green-100 p-2 rounded-full text-green-600 shrink-0 mt-1">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-800">2. Alvenaria e Telhado</h3>
                                <p className="text-gray-600 text-sm">Concluído. Paredes levantadas e cobertura finalizada.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="bg-secondary/20 p-2 rounded-full text-secondary shrink-0 mt-1">
                                <Hammer size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary">3. Acabamento Interno (Fase Atual)</h3>
                                <p className="text-gray-600 text-sm">Estamos trabalhando no piso, revestimentos e pintura.</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-start">
                            <div className="bg-gray-100 p-2 rounded-full text-gray-400 shrink-0 mt-1">
                                <CircleDashed size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-gray-500">4. Mobiliário Litúrgico</h3>
                                <p className="text-gray-500 text-sm">Futuramente: Altar, ambão, bancos e sacristia.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Donation Form */}
                <section className="bg-accent rounded-sm p-8 border border-secondary/20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Faça parte</span>
                            <h2 className="text-3xl font-bold text-primary mb-4">Quero Ajudar</h2>
                            <p className="text-gray-700 mb-6">
                                Deixe seus dados abaixo para que a equipe da Reforma entre em contato sobre como você pode contribuir (doação de material, valor ou serviço).
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-sm shadow-md">
                            <GenericForm
                                formName="reforma"
                                fields={[
                                    { name: "nome", label: "Seu Nome", type: "text", required: true },
                                    { name: "whatsapp", label: "WhatsApp", type: "tel", required: true },
                                    { name: "ajuda", label: "Como deseja ajudar?", type: "select", options: ["Doação em Dinheiro", "Doação de Material", "Mão de Obra / Serviço", "Divulgação / Voluntariado"], required: true },
                                    { name: "mensagem", label: "Conte-nos mais", type: "textarea", required: false }
                                ]}
                                submitLabel="Quero Colaborar"
                                successMessage="Obrigado! Sua disposição em ajudar foi registrada. Entraremos em contato em breve."
                            />
                        </div>
                    </div>
                </section>

            </div>
        </PageLayout>
    );
}
