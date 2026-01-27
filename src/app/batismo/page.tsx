
import { PageLayout } from "@/components/ui/PageLayout";
import { DynamicForm } from "@/components/ui/DynamicForm";
import { AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function BaptismPage() {
    return (
        <PageLayout
            title="Sacramento do Batismo"
            subtitle="Inicie o processo de batismo seguindo as normas da igreja"
            breadcrumbs={[{ label: "Sacramentos", href: "/sacramentos" }, { label: "Batismo", href: "/batismo" }]}
        >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Rules Section (Prominent) */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-red-50 p-6 rounded-sm border-l-4 border-red-500">
                        <h3 className="flex items-center gap-2 text-red-800 font-bold mb-4">
                            <AlertCircle size={20} />
                            Regras Importantes
                        </h3>
                        <ul className="space-y-4 text-sm text-red-900">
                            <li className="flex gap-2 items-start">
                                <XCircle size={16} className="mt-1 shrink-0" />
                                <span>
                                    <strong>Crianças com 7 anos ou mais:</strong> NÃO são batizadas diretamente. Elas devem obrigatoriamente fazer a <strong>Catequese</strong> primeiro.
                                </span>
                            </li>
                            <li className="flex gap-2 items-start">
                                <AlertCircle size={16} className="mt-1 shrink-0" />
                                <span>
                                    <strong>Pais de outra paróquia:</strong> Se residem em outro bairro (ex: Santo Afonso), é necessária autorização do padre da paróquia de origem.
                                </span>
                            </li>
                        </ul>
                        <div className="mt-4 pt-4 border-t border-red-200">
                            <Link href="/catequese" className="text-red-800 underline text-sm hover:text-red-950 font-bold">
                                &rarr; Inscrição na Catequese (7+ anos)
                            </Link>
                        </div>
                    </div>

                    <div className="bg-accent p-6 rounded-sm border border-secondary/20">
                        <h3 className="font-bold text-primary mb-4">Sobre os Pais e Padrinhos</h3>
                        <div className="space-y-4 text-sm text-gray-700">
                            <p>
                                <strong>Casados na Igreja Católica?</strong><br />
                                É obrigatório informar se os pais são casados na Igreja Católica. Casamento apenas civil ou em igreja evangélica não é considerado para este fim.
                            </p>
                            <p className="bg-white p-3 rounded-sm border border-gray-200 text-gray-600 italic">
                                <strong className="text-primary not-italic block mb-1">Pais não casados na Igreja:</strong>
                                Devem procurar a secretaria pessoalmente para agendar uma conversa. O contato deve partir dos próprios pais.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Introduction & Form */}
                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold text-primary mb-4">Solicitação de Agendamento</h2>
                    <p className="text-gray-600 mb-8">
                        O Batismo é a porta de entrada para a vida cristã. Se você reside no território da Paróquia São Pio X
                        e deseja batizar seu filho(a), preencha o formulário abaixo para dar início ao processo na secretaria.
                    </p>

                    <div className="bg-white p-8 rounded-sm shadow-md border-t-4 border-primary">
                        <DynamicForm slug="batismo" />
                    </div>
                </div>

            </div>
        </PageLayout>
    );
}
