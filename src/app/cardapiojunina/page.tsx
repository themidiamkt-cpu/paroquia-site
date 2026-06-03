import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cardápio Junino | Paróquia São Pio X",
    description: "Arquivo original do cardápio da Festa Junina da Paróquia São Pio X.",
};

export default function CardapioJuninaPage() {
    return (
        <main className="h-screen w-screen overflow-hidden bg-black">
            <iframe
                src="/cardapiojunina-original.pdf"
                title="Cardápio Junino"
                className="h-full w-full border-0"
            />
        </main>
    );
}
