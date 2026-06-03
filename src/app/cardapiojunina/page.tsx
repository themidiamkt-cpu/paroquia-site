import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRight,
    Candy,
    CupSoda,
    Gamepad2,
    Sparkles,
    Soup,
    UtensilsCrossed,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

type MenuItem = {
    name: string;
    price: number;
};

type MenuSection = {
    title: string;
    icon: typeof UtensilsCrossed;
    accent: string;
    items: MenuItem[];
};

const menuSections: MenuSection[] = [
    {
        title: "Salgados e Pratos",
        icon: UtensilsCrossed,
        accent: "from-amber-300 to-orange-500",
        items: [
            { name: "Mini Pizza Salgada", price: 14 },
            { name: "Cachorro Quente", price: 18 },
            { name: "Lanche de Pernil", price: 18 },
            { name: "Pastel", price: 10 },
            { name: "Frango Frito", price: 12 },
            { name: "Batata Frita", price: 12 },
            { name: "Espetinho", price: 10 },
            { name: "Caldos", price: 15 },
            { name: "Milho no Prato", price: 10 },
            { name: "Cuscuz", price: 8 },
        ],
    },
    {
        title: "Doces e Sobremesas",
        icon: Candy,
        accent: "from-red-400 to-orange-500",
        items: [
            { name: "Mini Pizza Doce", price: 16 },
            { name: "Curau", price: 8 },
            { name: "Doces", price: 5 },
            { name: "Açaí 500ml", price: 29 },
            { name: "Açaí 300ml", price: 26 },
            { name: "Picolé Zero Açúcar", price: 10 },
            { name: "Maçã do Amor", price: 8 },
        ],
    },
    {
        title: "Bebidas",
        icon: CupSoda,
        accent: "from-yellow-300 to-amber-500",
        items: [
            { name: "Chop Pilsen", price: 12 },
            { name: "Chop de Vinho", price: 13 },
            { name: "Cerveja Heineken", price: 10 },
            { name: "Cerveja Skol/Brahma", price: 8 },
            { name: "Refrigerantes", price: 7 },
            { name: "Água", price: 3 },
            { name: "Água com Gás", price: 4 },
            { name: "Suco", price: 6 },
            { name: "Quentão/Vinho Quente", price: 7 },
            { name: "Chá do Padre", price: 7 },
        ],
    },
    {
        title: "Diversão e Brincadeiras",
        icon: Gamepad2,
        accent: "from-orange-300 to-red-500",
        items: [
            { name: "Pesca", price: 7 },
            { name: "Cama Elástica", price: 7 },
            { name: "Piscina de Bolinhas", price: 7 },
        ],
    },
    {
        title: "Destaques da Noite",
        icon: Soup,
        accent: "from-red-300 to-yellow-500",
        items: [
            { name: "Mini Pizza Doce", price: 16 },
            { name: "Lanche de Pernil", price: 18 },
            { name: "Caldos", price: 15 },
            { name: "Quentão/Vinho Quente", price: 7 },
        ],
    },
];

function formatPrice(value: number) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(value);
}

export const metadata: Metadata = {
    title: "Cardápio Junino | Paróquia São Pio X",
    description: "Confira o cardápio da Festa Junina da Paróquia São Pio X com comidas, bebidas e brincadeiras.",
};

function BuntingRow() {
    const colors = ["bg-red-500", "bg-amber-300", "bg-orange-500", "bg-yellow-300"];

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-center gap-1 overflow-hidden px-4 pt-3 sm:gap-2 sm:px-8">
            {Array.from({ length: 18 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                    <div className="h-3 w-px bg-white/60 sm:h-4" />
                    <div
                        className={`h-0 w-0 border-l-[14px] border-r-[14px] border-t-[24px] border-l-transparent border-r-transparent ${colors[index % colors.length]} sm:border-l-[20px] sm:border-r-[20px] sm:border-t-[34px]`}
                    />
                </div>
            ))}
        </div>
    );
}

export default function CardapioJuninaPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans bg-slate-950">
            <Header />

            <main className="flex-grow">
                <section
                    className="relative overflow-hidden"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.16) 0, transparent 2px), radial-gradient(circle at 80% 15%, rgba(255,255,255,0.14) 0, transparent 2px), radial-gradient(circle at 15% 70%, rgba(255,255,255,0.12) 0, transparent 2px), linear-gradient(180deg, #08294a 0%, #0d3b66 55%, #09213c 100%)",
                    }}
                >
                    <BuntingRow />

                    <div className="container mx-auto px-4 pt-28 pb-16 sm:pt-32 sm:pb-20">
                        <div className="mx-auto max-w-4xl text-center text-white">
                            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
                                <Sparkles size={16} className="text-yellow-300" />
                                Festa Junina da Paróquia São Pio X
                            </div>

                            <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-yellow-300 drop-shadow md:text-6xl">
                                Cardápio Junino
                            </h1>

                            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
                                Todos os valores da nossa festa em uma página fácil de consultar no celular.
                                Comidas, bebidas, doces e brincadeiras para a família toda.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <Link
                                    href="/festa-junina"
                                    className="inline-flex items-center gap-2 rounded-full bg-yellow-300 px-6 py-3 font-bold text-slate-900 transition hover:bg-yellow-200"
                                >
                                    Saiba mais sobre a festa
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-[#fff7e8] py-14 sm:py-16">
                    <div className="container mx-auto px-4">
                        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <span className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
                                    Tabela de preços
                                </span>
                                <h2 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">
                                    Confira tudo por categoria
                                </h2>
                            </div>

                            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                                Valores organizados para facilitar a consulta durante a festa.
                                Em caso de atualização no evento, a equipe da barraca informará no local.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {menuSections.map((section) => {
                                const Icon = section.icon;

                                return (
                                    <article
                                        key={section.title}
                                        className="overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-[0_16px_45px_rgba(15,23,42,0.08)]"
                                    >
                                        <div className={`bg-gradient-to-r ${section.accent} px-6 py-5 text-slate-950`}>
                                            <div className="flex items-center gap-3">
                                                <div className="rounded-2xl bg-white/70 p-2.5">
                                                    <Icon size={22} />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black uppercase tracking-wide">
                                                        {section.title}
                                                    </h3>
                                                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-800/75">
                                                        Festa Junina
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-5 py-4 sm:px-6 sm:py-5">
                                            <ul className="space-y-3">
                                                {section.items.map((item) => (
                                                    <li
                                                        key={`${section.title}-${item.name}`}
                                                        className="flex items-end gap-3 text-sm sm:text-base"
                                                    >
                                                        <span className="font-bold uppercase tracking-wide text-slate-900">
                                                            {item.name}
                                                        </span>
                                                        <span className="mb-1 h-px flex-1 border-b border-dotted border-orange-300" />
                                                        <span className="whitespace-nowrap text-lg font-black text-red-600">
                                                            {formatPrice(item.price)}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
