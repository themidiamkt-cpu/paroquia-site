
import { PageLayout } from "@/components/ui/PageLayout";
import Image from "next/image";

export default function AboutPage() {
    return (
        <PageLayout
            title="A Paróquia"
            subtitle="Conheça nossa história, liderança e missão"
            breadcrumbs={[{ label: "A Paróquia", href: "/a-paroquia" }]}
        >
            <div className="space-y-16">
                {/* Intro */}
                <section className="prose max-w-none text-gray-600">
                    <h2 className="text-2xl font-bold text-primary mb-4">Nossa Comunidade</h2>
                    <p>
                        A Paróquia São Pio X, localizada no Jardim Santa Rosa em Campinas/SP, é uma comunidade viva e acolhedora,
                        dedicada a "restaurar todas as coisas em Cristo", lema de nosso padroeiro. Somos uma família de fé
                        que busca viver o Evangelho através da oração, do serviço e da caridade.
                    </p>
                    <p>
                        Nossa missão é evangelizar e acolher a todos, promovendo o encontro pessoal com Jesus Cristo através dos sacramentos
                        e da vida comunitária.
                    </p>
                </section>

                {/* Leadership */}
                <section>
                    <h2 className="text-2xl font-bold text-primary mb-8 border-b pb-2 border-gray-200">Nossa Liderança</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {/* Pe. Leandro */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-full md:w-1/3 bg-gray-200 rounded-sm aspect-[3/4] relative overflow-hidden shadow-md">
                                <Image
                                    src="/pe-leandro-v3.jpg"
                                    alt="Pe. Leandro Pariz"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-primary mb-1">Pe. Leandro Pariz</h3>
                                <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-4 block">Diretor Espiritual</span>
                                <p className="text-gray-600 mb-4">
                                    Atualmente exercendo a função de Diretor Espiritual da Paróquia São Pio X, o Pe. Leandro Pariz guia nossa
                                    comunidade com zelo pastoral e dedicação, conduzindo os fiéis no caminho da fé e da espiritualidade.
                                </p>
                                <div className="bg-accent/50 p-4 rounded-sm border border-secondary/20">
                                    <h4 className="font-bold text-primary text-sm mb-2">Atendimentos e Confissões:</h4>
                                    <p className="text-sm text-gray-700">
                                        <strong>Terças e Quintas:</strong> 08h às 12h e 14h às 17h<br />
                                        <strong>Sábados:</strong> 08h às 12h<br />
                                        <span className="text-xs text-gray-500 mt-1 block">* Agendamento prévio na secretaria.</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Seminarista */}
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-full md:w-1/3 bg-gray-200 rounded-sm aspect-[3/4] relative overflow-hidden shadow-md">
                                <Image
                                    src="/seminarista-joao.jpg"
                                    alt="Seminarista João Henrique"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-primary mb-1">João Bento</h3>
                                <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-4 block">Seminarista (Ano de Síntese)</span>
                                <p className="text-gray-600 mb-4 text-justify">
                                    Seminarista em formação, Bento realiza na Paróquia São Pio X o seu Ano de Síntese, etapa conclusiva do processo formativo anterior à ordenação diaconal. Desenvolve atividades pastorais e comunitárias, colaborando com a vida litúrgica, catequética e administrativa da paróquia, em consonância com as diretrizes da Igreja e sob orientação da equipe pastoral.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Patron Saint */}
                <section className="bg-accent rounded-sm p-8 border border-secondary/20">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-primary mb-4">São Pio X, nosso Padroeiro</h2>
                            <p className="text-gray-700 mb-4 text-justify">
                                Giuseppe Melchiorre Sarto, eleito Papa Pio X em 1903, foi conhecido por sua simplicidade, pobreza e firmeza doutrinal.
                                Seu lema pontifício, <em>"Instaurare omnia in Christo"</em> (Restaurar todas as coisas em Cristo), guia nossa paróquia.
                            </p>
                            <p className="text-gray-700 text-justify">
                                Foi ele quem incentivou a comunhão frequente e permitiu a primeira comunhão para crianças, sendo chamado de "Papa da Eucaristia".
                                Sua intercessão nos inspira a amar profundamente a Jesus Sacramentado.
                            </p>
                        </div>
                        <div className="w-full md:w-1/3">
                            <div className="aspect-[3/4] bg-white rounded-sm shadow-lg p-2 relative">
                                <div className="w-full h-full relative overflow-hidden rounded-sm">
                                    <Image
                                        src="/sao-pio-x.jpg"
                                        alt="São Pio X"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pascom */}
                <section>
                    <h2 className="text-xl font-bold text-primary mb-4">Pastoral da Comunicação (PASCOM)</h2>
                    <p className="text-gray-600">
                        Esta página e nossas redes sociais são mantidas pela PASCOM, que tem a missão de ser o eixo transversal de todas as pastorais,
                        levando a Boa Nova através dos meios de comunicação e integrando a comunidade.
                    </p>
                </section>
            </div>
        </PageLayout>
    );
}
