import { PageLayout } from "@/components/ui/PageLayout";
import { getCommunities, getCommunitySchedules, getCommunityCoordinators } from "@/lib/actions";
import { MapPin, Clock, User, Users } from "lucide-react";
import Image from "next/image";

export const revalidate = 0; // Ensure fresh data

export default async function ComunidadesPage() {
    const communities = await getCommunities();

    return (
        <PageLayout
            title="Nossas Comunidades"
            subtitle="Conheça as comunidades que formam a nossa paróquia."
            breadcrumbs={[{ label: "Comunidades", href: "/comunidades" }]}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {communities?.map(async (community) => {
                    const schedules = await getCommunitySchedules(community.id);
                    const coordinators = await getCommunityCoordinators(community.id);

                    return (
                        <div key={community.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow flex flex-col">
                            <div className="relative h-56 w-full bg-gray-100">
                                {community.image_url ? (
                                    <Image
                                        src={community.image_url}
                                        alt={community.name}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
                                        <MapPin size={64} opacity={0.2} />
                                    </div>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                                    <h2 className="text-xl font-bold text-white leading-tight">{community.name}</h2>
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col space-y-4">
                                {/* Address */}
                                <div className="flex items-start gap-3 text-gray-600">
                                    <MapPin className="shrink-0 text-secondary mt-1" size={18} />
                                    <p className="text-sm">{community.address}</p>
                                </div>

                                {/* Description */}
                                {community.description && (
                                    <p className="text-gray-600 text-sm italic border-l-2 border-gray-200 pl-3">
                                        "{community.description}"
                                    </p>
                                )}

                                {/* Coordinators */}
                                {coordinators && coordinators.length > 0 && (
                                    <div className="pt-2">
                                        <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                            <Users size={16} /> Coordenação
                                        </h3>
                                        <ul className="space-y-2">
                                            {coordinators.map((coord: any) => (
                                                <li key={coord.id} className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-100">
                                                    <span className="font-medium block">{coord.name}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Schedules */}
                                {schedules && schedules.length > 0 && (
                                    <div className="pt-2 mt-auto">
                                        <h3 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                            <Clock size={16} /> Horários
                                        </h3>
                                        <div className="space-y-1">
                                            {schedules.map((schedule: any) => (
                                                <div key={schedule.id} className="flex justify-between text-sm border-b border-gray-50 last:border-0 py-1">
                                                    <span className="font-medium text-gray-700">
                                                        {["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"][schedule.day_of_week]}
                                                    </span>
                                                    <span className="text-gray-600">
                                                        {schedule.time.slice(0, 5)} - {schedule.type}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </PageLayout>
    );
}
