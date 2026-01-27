
import { Hammer, ArrowRight } from "lucide-react";
import { getReformUpdates } from "@/lib/actions";
import { HelpReformButton } from "./HelpReformButton";

export async function ChapelReform() {
    const updates = await getReformUpdates();

    // If no updates found, don't show the section (as requested: "quando terminar vamos excluir e essa sessao vai sair")
    if (!updates || updates.length === 0) {
        return null;
    }

    const latest = updates[0];

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Construindo Juntos</span>
                        <h2 className="text-3xl font-bold text-primary mb-6">{latest.title}</h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {latest.description}
                        </p>

                        <div className="bg-accent p-6 rounded-sm mb-8 border border-blue-100">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-sm font-bold text-primary">Status da Obra</span>
                                <span className="text-2xl font-bold text-secondary">{latest.percent_complete}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div className="bg-secondary h-3 rounded-full transition-all duration-1000" style={{ width: `${latest.percent_complete}%` }}></div>
                            </div>
                            <div className="mt-2 text-xs text-gray-500 text-right">Fase Atual: {latest.stage}</div>
                        </div>

                        <div className="flex gap-4">
                            <HelpReformButton />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 relative">
                        <div className="absolute inset-0 bg-secondary rounded-sm transform rotate-3 opacity-20 translate-x-4 translate-y-4"></div>
                        <div className="relative aspect-video bg-gray-200 rounded-sm overflow-hidden shadow-xl border-4 border-white">
                            {latest.image_url ? (
                                <img src={latest.image_url} alt={latest.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                    <span className="font-medium">Sem foto recente</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
