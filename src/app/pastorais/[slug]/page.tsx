
import { getPastoralBySlug, getPastoralMembers } from "@/lib/actions";
import { PageLayout } from "@/components/ui/PageLayout";
import { User, Phone, Users, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ParticipateButton } from "@/components/pastorals/ParticipateButton";

export const revalidate = 60;

export default async function PastoralDetailSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pastoral = await getPastoralBySlug(slug);

    if (!pastoral) {
        notFound();
    }

    const members = await getPastoralMembers(pastoral.id);

    // Format WhatsApp link
    const waNumber = pastoral.contact?.replace(/[^0-9]/g, '');
    const waLink = waNumber ? `https://wa.me/55${waNumber}` : null;

    return (
        <PageLayout
            title={pastoral.name}
            breadcrumbs={[
                { label: "Pastorais", href: "/pastorais" },
                { label: pastoral.name, href: `/pastorais/${slug}` }
            ]}
        >
            <div className="max-w-4xl mx-auto">
                {/* Hero / Header Card */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                    {pastoral.image_url && (
                        <div className="w-full h-64 md:h-80 bg-gray-100 relative">
                            <img
                                src={pastoral.image_url}
                                alt={pastoral.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <div className="p-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-grow">
                                <h1 className="text-3xl font-bold text-primary mb-4">{pastoral.name}</h1>
                                <p className="text-gray-700 leading-relaxed text-lg mb-6 whitespace-pre-line">
                                    {pastoral.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mt-6">
                                    {pastoral.coordinator && (
                                        <div className="bg-gray-50 px-4 py-3 rounded-lg border flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 font-bold uppercase">Coordenação</p>
                                                <p className="font-medium text-gray-800">{pastoral.coordinator}</p>
                                            </div>
                                        </div>
                                    )}

                                    {waLink && (
                                        <a
                                            href={waLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-green-50 px-4 py-3 rounded-lg border border-green-100 flex items-center gap-3 hover:bg-green-100 transition group"
                                        >
                                            <div className="bg-green-100 p-2 rounded-full text-green-600 group-hover:bg-green-200">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs text-green-600 font-bold uppercase">WhatsApp</p>
                                                <p className="font-medium text-green-800">Falar com Coordenador</p>
                                            </div>
                                        </a>
                                    )}

                                    {/* "Quero Participar" Button (Generic fallback if no specific contact, or primary CTA) */}
                                    <ParticipateButton
                                        pastoralName={pastoral.name}
                                        waLink={waLink}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Members Section */}
                {members && members.length > 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b">
                            <Users className="text-secondary" size={24} />
                            <h2 className="text-2xl font-bold text-gray-800">Membros da Pastoral</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {members.map((member: any) => (
                                <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border hover:border-gray-200 transition">
                                    <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-gray-400 border font-bold text-sm">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{member.name}</p>
                                        {member.role && (
                                            <p className="text-xs text-secondary font-medium uppercase">{member.role}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link href="/pastorais" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition font-medium">
                        <ArrowLeft size={18} /> Voltar para Pastorais
                    </Link>
                </div>
            </div>
        </PageLayout>
    );
}
