import Link from "next/link";
import { Instagram } from "lucide-react";

export function InstagramFeed() {
    return (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                        Siga-nos no Instagram
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Acompanhe as atividades e novidades da nossa paróquia.
                    </p>

                    <Link
                        href="https://instagram.com/piox.pspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Instagram size={20} />
                        <span>@piox.pspx</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
