import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cardápio Junino | Paróquia São Pio X",
    description: "Cardápio da Festa Junina da Paróquia São Pio X.",
};

export default function CardapioJuninaPage() {
    return (
        <main className="min-h-screen bg-[#0a2f55] px-1 py-1 sm:px-3 sm:py-3">
            <div className="mx-auto w-full max-w-[842px]">
                <Image
                    src="/cardapiojunina-original.png"
                    alt="Cardápio da Festa Junina"
                    width={842}
                    height={1190}
                    priority
                    className="block h-auto w-full"
                />
            </div>
        </main>
    );
}
