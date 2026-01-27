
import { Camera } from "lucide-react";

export function RecentGallery() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-secondary font-bold uppercase tracking-widest text-sm mb-2 block">Momentos</span>
                    <h2 className="text-3xl font-bold text-primary">Galeria de Fotos</h2>
                    <p className="text-gray-500 mt-2">Confira as fotos dos últimos eventos da nossa paróquia</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="aspect-square bg-gray-200 rounded-sm overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Foto {item}
                            </div>
                            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
