
import { PageLayout } from "@/components/ui/PageLayout";
import { Link as ScrollLink } from "lucide-react"; // Using Lucide icon as anchor indicator maybe? No, let's just use standard links.
import Link from "next/link";

export default function SacramentosPage() {
    return (
        <PageLayout
            title="Sacramentos"
            subtitle="Os sinais visíveis da graça de Deus em nossa vida"
            breadcrumbs={[{ label: "Sacramentos", href: "/sacramentos" }]}
        >
            <div className="space-y-16">

                {/* Intro */}
                <section className="text-center max-w-3xl mx-auto">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Os sacramentos são gestos de Deus em nossa vida, instituídos por Cristo e confiados à Igreja.
                        Através deles, recebemos a graça divina para santificar nossa caminhada de fé.
                    </p>
                </section>

                {/* Batismo */}
                <section id="batismo" className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-primary scroll-mt-24">
                    <h2 className="text-2xl font-bold text-primary mb-4">1. Batismo</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            O Batismo é o fundamento de toda a vida cristã, o pórtico da vida no Espírito e a porta que abre o acesso aos demais sacramentos.
                            Pelo Batismo somos libertados do pecado e regenerados como filhos de Deus, tornamo-nos membros de Cristo e somos incorporados à Igreja.
                        </p>
                        <div className="mt-6 bg-accent/30 p-4 rounded-sm">
                            <h3 className="text-lg font-bold text-primary mb-2">Para batizar na São Pio X:</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Pais devem residir no território paroquial (ou ter autorização de sua paróquia).</li>
                                <li>Crianças com 7 anos ou mais devem frequentar a Catequese.</li>
                                <li>Pais e padrinhos devem participar da preparação (curso de batismo).</li>
                            </ul>
                            <div className="mt-4">
                                <Link href="/batismo" className="text-white bg-secondary px-4 py-2 rounded-sm font-bold text-sm inline-block hover:shadow-md transition-all">
                                    Ler Regras e Agendar
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Eucaristia */}
                <section id="eucaristia" className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-secondary scroll-mt-24">
                    <h2 className="text-2xl font-bold text-primary mb-4">2. Eucaristia (Primeira Comunhão)</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            A Sagrada Eucaristia completa a iniciação cristã. Aqueles que foram elevados à dignidade do sacerdócio real pelo Batismo e
                            configurados mais profundamente a Cristo pela Crisma, participam, por meio da Eucaristia, com toda a comunidade, do próprio sacrifício do Senhor.
                        </p>
                        <p>
                            Para receber a Primeira Eucaristia, a criança ou adulto deve passar pelo processo de <strong>Catequese</strong>,
                            onde conhecerá a fé católica e se preparará para receber o Corpo e Sangue de Cristo.
                        </p>
                        <div className="mt-4">
                            <Link href="/catequese" className="text-primary font-bold hover:text-secondary underline decoration-2 underline-offset-4">
                                Saiba mais sobre a Catequese &rarr;
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Crisma */}
                <section id="crisma" className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-primary scroll-mt-24">
                    <h2 className="text-2xl font-bold text-primary mb-4">3. Crisma (Confirmação)</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            A Confirmação aperfeiçoa a graça batismal; é o sacramento que dá o Espírito Santo para enraizar-nos mais profundamente na filiação divina,
                            incorporar-nos mais firmemente a Cristo, tornar mais sólida a nossa vinculação com a Igreja, associar-nos mais à sua missão e
                            ajudar-nos a dar testemunho da fé cristã pela palavra, acompanhada das obras.
                        </p>
                        <p>
                            Jovens e adultos que desejam receber o sacramento da Crisma também devem se inscrever na Catequese Paroquial.
                        </p>
                    </div>
                </section>

                {/* Matrimônio */}
                <section id="matrimonio" className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-secondary scroll-mt-24">
                    <h2 className="text-2xl font-bold text-primary mb-4">4. Matrimônio</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            O pacto matrimonial, pelo qual o homem e a mulher constituem entre si uma comunidade íntima de vida e de amor,
                            foi fundado e dotado de suas leis próprias pelo Criador. Por sua própria natureza, ordena-se ao bem dos cônjuges,
                            como também à geração e educação dos filhos.
                        </p>
                        <div className="bg-gray-50 p-4 border border-gray-100 rounded-sm mt-4">
                            <h4 className="font-bold text-gray-800 mb-2">Deseja casar-se na Igreja?</h4>
                            <p className="text-sm">
                                Os noivos devem procurar a secretaria paroquial com pelo menos <strong>6 meses de antecedência</strong> para dar entrada no Processo de Habilitação Matrimonial.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Unção */}
                <section id="uncao" className="bg-white p-8 rounded-sm shadow-sm border-l-4 border-primary scroll-mt-24">
                    <h2 className="text-2xl font-bold text-primary mb-4">5. Unção dos Enfermos</h2>
                    <div className="prose max-w-none text-gray-600">
                        <p>
                            Pela sagrada unção dos enfermos e pela oração dos presbíteros, a Igreja toda recomenda os doentes ao Senhor sofredor e glorificado,
                            para que os alivie e os salve.
                        </p>
                        <p>
                            Se você tem algum familiar enfermo ou idoso que deseja receber a visita do padre para a Unção ou Confissão,
                            entre em contato com a Secretaria para agendamento.
                        </p>
                        <p className="mt-2 font-bold text-primary">
                            Telefone: (19) 3261-2099
                        </p>
                    </div>
                </section>

            </div>
        </PageLayout>
    );
}
