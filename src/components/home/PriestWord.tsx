
import Image from "next/image";

export function PriestWord() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/3">
                        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/pe-leandro-v3.jpg"
                                alt="Pe. Leandro Pariz"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="w-full md:w-2/3">
                        <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Espiritualidade</span>
                        <h2 className="text-3xl font-bold text-primary mb-6">Palavra do Pe. Leandro</h2>
                        <div className="prose text-gray-600 mb-6">
                            <p className="italic text-lg mb-4">
                                "Amados irmãos e irmãs, caminhemos juntos na fé, com o coração aberto para acolher a vontade de Deus em nossas vidas."
                            </p>
                            <p>
                                Nossa comunidade é um lugar de encontro com Cristo e com o próximo. Convido a todos a participarem ativamente de nossas celebrações e pastorais.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-primary shadow-sm bg-primary">
                                <Image
                                    src="/pe-leandro-v3.jpg"
                                    alt="Pe. Leandro Pariz"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-primary">Pe. Leandro Pariz</p>
                                <p className="text-xs text-gray-500 uppercase mb-1">Diretor Espiritual</p>
                                <p className="text-sm text-secondary font-serif italic">“O Amor me amou”</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
