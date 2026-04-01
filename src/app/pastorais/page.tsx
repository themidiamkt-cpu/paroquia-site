import { PageLayout } from "@/components/ui/PageLayout";
import { ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { getPastorals } from "@/lib/actions";

export const revalidate = 0;

export default async function PastoralsPage() {
    const pastorals = await getPastorals();

    return (
        <PageLayout
            title="Pastorais e Movimentos"
            subtitle="Nossa fé se faz obras através do serviço pastoral"
            breadcrumbs={[{ label: "Pastorais", href: "/pastorais" }]}
        >
            <div className="space-y-12">

                {/* Intro */}
                <section className="bg-accent/30 p-8 rounded-sm border-l-4 border-secondary">
                    <h2 className="text-xl font-bold text-primary mb-3">A Importância das Pastorais</h2>
                    <p className="text-gray-700 leading-relaxed">
                        &ldquo;A Igreja é viva se você é vivo&rdquo;. As pastorais são os braços da paróquia que alcançam as diversas necessidades da comunidade.
                        Participar de uma pastoral é colocar seus dons a serviço do Reino de Deus. Convidamos você a conhecer e se engajar!
                    </p>
                </section>

                {/* List */}
                {pastorals.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhuma pastoral cadastrada.</p>
                ) : (
                    <section className="grid grid-cols-2 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                        {pastorals.map((pastoral) => (
                            <Link
                                href={`/pastorais/${pastoral.slug || pastoral.id}`}
                                key={pastoral.id}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                            >
                                {pastoral.image_url ? (
                                    <div className="h-28 w-full bg-gray-100 relative overflow-hidden md:h-48">
                                        <img src={pastoral.image_url} alt={pastoral.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    </div>
                                ) : (
                                    <div className="h-24 w-full bg-primary/5 flex items-center justify-center md:h-32">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary md:h-16 md:w-16 md:text-2xl">
                                            {pastoral.name.charAt(0)}
                                        </div>
                                    </div>
                                )}

                                <div className="flex grow flex-col p-4 md:p-6">
                                    <h3 className="mb-2 text-base font-bold text-primary transition group-hover:text-secondary md:text-xl">{pastoral.name}</h3>
                                    <p className="mb-4 line-clamp-3 flex-grow text-xs leading-relaxed text-gray-600 md:text-sm">{pastoral.description}</p>

                                    <div className="mt-auto border-t border-gray-50 pt-3 text-xs md:pt-4 md:text-sm">
                                        {pastoral.coordinator ? (
                                            <span className="mb-3 flex items-center gap-1 font-medium text-gray-700 md:mb-0">
                                                <User size={14} /> {pastoral.coordinator}
                                            </span>
                                        ) : <span></span>}

                                        <span className="flex items-center gap-1 font-bold text-secondary transition group-hover:translate-x-1">
                                            Saiba mais <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </section>
                )}

                {/* CTA */}
                <section className="text-center py-10">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Sente o chamado para servir?</h3>
                    <p className="text-gray-600 mb-6">Entre em contato conosco ou fale com o coordenador após a missa.</p>
                    <a
                        href="/contato"
                        className="bg-primary text-white px-8 py-3 rounded-sm font-bold hover:bg-primary/90 transition-colors inline-block shadow-md"
                    >
                        Quero Participar
                    </a>
                </section>

            </div>
        </PageLayout>
    );
}
