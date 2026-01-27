import { PageLayout } from "@/components/ui/PageLayout";
import { Link as LinkIcon, ArrowRight, User } from "lucide-react";
import Image from "next/image";
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
                        "A Igreja é viva se você é vivo". As pastorais são os braços da paróquia que alcançam as diversas necessidades da comunidade.
                        Participar de uma pastoral é colocar seus dons a serviço do Reino de Deus. Convidamos você a conhecer e se engajar!
                    </p>
                </section>

                {/* List */}
                {pastorals.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhuma pastoral cadastrada.</p>
                ) : (
                    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pastorals.map((pastoral) => (
                            <Link
                                href={`/pastorais/${pastoral.slug || pastoral.id}`}
                                key={pastoral.id}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                            >
                                {pastoral.image_url ? (
                                    <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                                        <img src={pastoral.image_url} alt={pastoral.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                                    </div>
                                ) : (
                                    <div className="h-32 w-full bg-primary/5 flex items-center justify-center">
                                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                                            {pastoral.name.charAt(0)}
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition">{pastoral.name}</h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">{pastoral.description}</p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-sm">
                                        {pastoral.coordinator ? (
                                            <span className="text-gray-700 font-medium flex items-center gap-1">
                                                <User size={14} /> {pastoral.coordinator}
                                            </span>
                                        ) : <span></span>}

                                        <span className="text-secondary font-bold flex items-center gap-1 group-hover:translate-x-1 transition">
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
