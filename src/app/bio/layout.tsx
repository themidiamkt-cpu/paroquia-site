import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bio | Paróquia São Pio X",
    description: "Links úteis da Paróquia São Pio X — Campinas/SP",
};

export default function BioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
