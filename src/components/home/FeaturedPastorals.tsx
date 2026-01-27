
import Link from "next/link";
import { ArrowRight, User } from "lucide-react";
import { getPastorals } from "@/lib/actions";

export async function FeaturedPastorals() {
    const allPastorals = await getPastorals();
    const pastorals = allPastorals.slice(0, 3);

    return (
        <section className="py-20 bg-accent/30">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">
                            Comunidade
                        </span>
                        <h2 className="text-3xl font-bold text-primary">
                            Pastorais e Movimentos
                        </h2>
                    </div>
                    <Link
                        href="/pastorais"
                        className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                    >
                        Ver todas <ArrowRight size={18} />
                    </Link>
                </div>

                {pastorals.length === 0 ? (
                    <p className="text-center text-gray-500">Nenhuma pastoral cadastrada.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pastorals.map((pastoral) => (
                            <Link
                                href={`/pastorais/${pastoral.slug || pastoral.id}`}
                                key={pastoral.id}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col"
                            >
                                {pastoral.image_url ? (
                                    <div className="h-48 w-full bg-gray-100 relative overflow-hidden">
                                        <img
                                            src={pastoral.image_url}
                                            alt={pastoral.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                    </div>
                                ) : (
                                    <div className="h-32 w-full bg-primary/5 flex items-center justify-center">
                                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
                                            {pastoral.name.charAt(0)}
                                        </div>
                                    </div>
                                )}

                                <div className="p-6 flex-grow flex flex-col">
                                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-secondary transition">
                                        {pastoral.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                                        {pastoral.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 text-sm">
                                        {pastoral.coordinator ? (
                                            <span className="text-gray-500 flex items-center gap-1">
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
                    </div>
                )}

                <div className="mt-8 md:hidden text-center">
                    <Link
                        href="/pastorais"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                    >
                        Ver todas <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
