import type { Metadata } from "next";

type MenuItem = {
    name: string;
    price: number;
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

const menuSections: MenuSection[] = [
    {
        title: "Salgados e Pratos",
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
        title: "Brincadeiras",
        items: [
            { name: "Pesca", price: 7 },
            { name: "Cama Elástica", price: 7 },
            { name: "Piscina de Bolinhas", price: 7 },
        ],
    },
    {
        title: "Especiais",
        items: [
            { name: "Picolé Zero Açúcar", price: 10 },
            { name: "Maçã do Amor", price: 8 },
        ],
    },
];

export const metadata: Metadata = {
    title: "Cardápio Junino | Paróquia São Pio X",
    description: "Tabela de preços da Festa Junina da Paróquia São Pio X.",
};

function formatPrice(value: number) {
    return `R$${value},00`;
}

function Lantern({ className }: { className: string }) {
    return (
        <div className={`pointer-events-none absolute ${className}`}>
            <div className="relative h-24 w-12 sm:h-32 sm:w-16">
                <div className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-amber-100/70" />
                <div className="absolute top-4 h-14 w-full rounded-full bg-gradient-to-b from-amber-300 via-orange-500 to-red-500 shadow-[0_0_30px_rgba(255,190,92,0.35)]">
                    <div className="absolute inset-y-1 left-1/2 w-px -translate-x-1/2 bg-amber-100/70" />
                    <div className="absolute inset-y-1 left-3 w-px bg-amber-100/40" />
                    <div className="absolute inset-y-1 right-3 w-px bg-amber-100/40" />
                    <div className="absolute inset-x-2 top-1 h-3 rounded-full bg-amber-200/70" />
                </div>
                <div className="absolute bottom-1 left-1/2 h-5 w-px -translate-x-1/2 bg-amber-100/70" />
                <div className="absolute bottom-0 left-1/2 h-4 w-4 -translate-x-1/2 rounded-b-full border-x border-b border-amber-100/60" />
            </div>
        </div>
    );
}

function BuntingRow() {
    const colors = [
        "bg-red-500",
        "bg-yellow-300",
        "bg-orange-500",
        "bg-amber-200",
    ];

    return (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 overflow-hidden pt-2 sm:pt-4">
            <div className="absolute left-[-5%] right-[-5%] top-0 h-1 rotate-[2deg] bg-amber-100/90" />
            <div className="absolute left-[-5%] right-[-5%] top-5 h-1 -rotate-[2deg] bg-amber-100/85 sm:top-7" />
            <div className="flex justify-center gap-1 px-2 pt-4 sm:gap-2 sm:px-6 sm:pt-6">
                {Array.from({ length: 22 }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="h-2 w-px bg-amber-100/70 sm:h-3" />
                        <div
                            className={`h-0 w-0 border-l-[11px] border-r-[11px] border-t-[20px] border-l-transparent border-r-transparent ${colors[index % colors.length]} sm:border-l-[16px] sm:border-r-[16px] sm:border-t-[28px]`}
                        />
                    </div>
                ))}
            </div>
            {Array.from({ length: 9 }).map((_, index) => (
                <div
                    key={`light-${index}`}
                    className="absolute top-4 h-3 w-3 rounded-full bg-amber-100 shadow-[0_0_18px_rgba(255,245,194,0.95)] sm:top-6 sm:h-4 sm:w-4"
                    style={{ left: `${6 + index * 11}%` }}
                />
            ))}
        </div>
    );
}

function MenuLine({
    item,
    isRed,
}: {
    item: MenuItem;
    isRed: boolean;
}) {
    const textClass = isRed ? "text-[#ff432f]" : "text-[#ffbf47]";

    return (
        <li className="flex items-end gap-2 sm:gap-3">
            <span
                className={`max-w-[68%] text-left text-[1.15rem] font-black uppercase leading-none tracking-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.32)] sm:max-w-none sm:text-[2rem] ${textClass}`}
            >
                {item.name}
            </span>
            <span
                className={`mb-[0.18em] h-[0.45em] flex-1 overflow-hidden text-[0.85rem] leading-none sm:text-[1.15rem] ${textClass}`}
                aria-hidden="true"
            >
                ................................................................................................
            </span>
            <span
                className={`whitespace-nowrap text-[1.15rem] font-black leading-none tracking-tight drop-shadow-[2px_2px_0_rgba(0,0,0,0.32)] sm:text-[2rem] ${textClass}`}
            >
                {formatPrice(item.price)}
            </span>
        </li>
    );
}

export default function CardapioJuninaPage() {
    const sectionsForColumns = [
        menuSections.slice(0, 2),
        menuSections.slice(2, 4),
        menuSections.slice(4),
    ];

    return (
        <main
            className="relative min-h-screen overflow-hidden bg-[#0a2f52] font-sans"
            style={{
                backgroundImage: `
                    radial-gradient(circle at 12% 18%, rgba(255,255,255,0.22) 0, transparent 2px),
                    radial-gradient(circle at 75% 26%, rgba(255,255,255,0.18) 0, transparent 2px),
                    radial-gradient(circle at 38% 70%, rgba(255,255,255,0.15) 0, transparent 2px),
                    radial-gradient(circle at 86% 76%, rgba(255,255,255,0.12) 0, transparent 2px),
                    linear-gradient(180deg, #0d4373 0%, #082f52 100%)
                `,
            }}
        >
            <BuntingRow />

            <Lantern className="left-2 top-32 rotate-[-10deg] sm:left-8 sm:top-36" />
            <Lantern className="right-2 top-40 rotate-[10deg] sm:right-8 sm:top-40" />
            <Lantern className="left-5 top-[42%] rotate-[8deg] sm:left-12" />
            <Lantern className="right-4 top-[58%] rotate-[-8deg] sm:right-10" />
            <Lantern className="left-3 bottom-20 rotate-[-6deg] sm:left-10" />
            <Lantern className="right-3 bottom-12 rotate-[9deg] sm:right-8" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-24 sm:px-8 sm:pb-16 sm:pt-28">
                <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/8 bg-[rgba(6,27,50,0.28)] px-5 py-7 shadow-[0_30px_80px_rgba(0,0,0,0.3)] backdrop-blur-[2px] sm:px-8 sm:py-10 lg:px-12">
                    <header className="mb-8 text-center sm:mb-10">
                        <h1 className="text-[2.8rem] font-black uppercase leading-none tracking-tight text-[#ffbf47] drop-shadow-[4px_4px_0_rgba(0,0,0,0.35)] sm:text-[4.5rem] lg:text-[5.5rem]">
                            Tabela de Preços
                        </h1>
                    </header>

                    <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                        {sectionsForColumns.map((columnSections, columnIndex) => (
                            <div key={`column-${columnIndex}`} className="space-y-6">
                                {columnSections.map((section, sectionIndex) => (
                                    <section key={section.title}>
                                        <div className="mb-3 inline-flex rounded-full border border-amber-200/30 bg-amber-300/12 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.24em] text-amber-200 sm:text-sm">
                                            {section.title}
                                        </div>

                                        <ul className="space-y-3 sm:space-y-4">
                                            {section.items.map((item, itemIndex) => (
                                                <MenuLine
                                                    key={`${section.title}-${item.name}`}
                                                    item={item}
                                                    isRed={(itemIndex + sectionIndex + columnIndex) % 2 === 1}
                                                />
                                            ))}
                                        </ul>
                                    </section>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
