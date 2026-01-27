import { MapPin, ExternalLink } from "lucide-react";

export function Location() {
    // Link direto para o Google Maps
    const googleMapsUrl = "https://maps.app.goo.gl/8dhR87BzY4nVYY4h8";

    // Embed URL do Google Maps
    const embedUrl = "https://www.google.com/maps?q=Paróquia+São+Pio+X,+Campinas,+SP&output=embed";

    return (
        <section className="relative">
            {/* Google Maps Embed */}
            <div className="h-[400px] w-full">
                <iframe
                    src={embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização da Paróquia São Pio X"
                />
            </div>

            {/* Card com endereço */}
            <div className="absolute bottom-8 left-4 md:left-12 bg-white p-6 rounded-xl shadow-xl max-w-sm z-10">
                <div className="flex items-start gap-3">
                    <MapPin className="text-primary mt-1 flex-shrink-0" />
                    <div>
                        <h3 className="font-bold text-gray-900">Paróquia São Pio X</h3>
                        <p className="text-sm text-gray-600 mt-1">
                            R. Eudes Batista Ribeiro, S/N<br />
                            Jardim Santa Rosa, Campinas – SP
                        </p>
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-3 text-sm font-bold text-primary hover:underline"
                        >
                            Como chegar <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
