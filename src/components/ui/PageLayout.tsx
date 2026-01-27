import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";

interface Breadcrumb {
    label: string;
    href: string;
}

interface PageProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Breadcrumb[];
    children: React.ReactNode;
}

export function PageLayout({ title, subtitle, breadcrumbs, children }: PageProps) {
    return (
        <div className="min-h-screen flex flex-col font-sans">
            <Header />
            <main className="flex-grow bg-accent pb-20">
                <div className="bg-primary text-white py-12 mb-12 border-b-4 border-secondary relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10 bg-[url('/logo.png')] bg-no-repeat bg-right-bottom bg-contain mix-blend-overlay"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        {/* Breadcrumbs */}
                        {breadcrumbs && (
                            <nav className="flex items-center gap-2 text-xs text-secondary font-bold uppercase tracking-widest mb-4">
                                <Link href="/" className="hover:text-white transition-colors">Início</Link>
                                {breadcrumbs.map((crumb, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <ChevronRight size={12} />
                                        <Link href={crumb.href} className="hover:text-white transition-colors">
                                            {crumb.label}
                                        </Link>
                                    </div>
                                ))}
                            </nav>
                        )}

                        <h1 className="text-4xl font-bold mb-2">{title}</h1>
                        {subtitle && (
                            <p className="text-gray-300 text-lg max-w-2xl">{subtitle}</p>
                        )}
                    </div>
                </div>
                <div className="container mx-auto px-4">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
}
