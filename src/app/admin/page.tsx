
import { getDashboardStats, getFormSubmissions } from "@/lib/actions";
import { FileText, Calendar, Bell, Inbox, Hammer, Users } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    // Also fetch latest forms for the list (limited to 5)
    // We can optimization actions.ts to accept limit, but for now we fetch all and slice (since volume is likely low initially, or we could add limit param later).
    // Actually, getFormSubmissions doesn't take limit. I'll just slice the array.
    const allForms = await getFormSubmissions();
    const recentForms = allForms ? allForms.slice(0, 5) : [];

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Visão Geral</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Solicitações</div>
                        <div className="text-3xl font-bold text-primary">{stats.formsCount}</div>
                    </div>
                    <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                        <Inbox size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Notícias</div>
                        <div className="text-3xl font-bold text-secondary">{stats.newsCount}</div>
                    </div>
                    <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center text-secondary">
                        <FileText size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Próximos Eventos</div>
                        <div className="text-3xl font-bold text-green-600">{stats.eventsCount}</div>
                    </div>
                    <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                        <Calendar size={24} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <div className="text-sm font-medium text-gray-500 mb-1">Progresso Reforma</div>
                        <div className="text-3xl font-bold text-orange-600">{stats.reformaPercent}%</div>
                    </div>
                    <div className="h-12 w-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600">
                        <Hammer size={24} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 font-bold text-gray-800 flex justify-between items-center">
                        <span>Últimas Solicitações</span>
                        <Link href="/admin/formularios" className="text-sm text-primary hover:underline">Ver todas</Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentForms.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">Nenhuma solicitação recebida.</div>
                        ) : (
                            recentForms.map(form => (
                                <div key={form.id} className="p-4 hover:bg-gray-50 flex items-start gap-3">
                                    <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                                    <div>
                                        <div className="font-medium text-gray-800">{form.form_type}</div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(form.created_at).toLocaleDateString()} às {new Date(form.created_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h2 className="font-bold text-gray-800 mb-4">Acesso Rápido</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/noticias" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex flex-col items-center justify-center gap-2 text-center">
                            <FileText size={24} className="text-gray-500" />
                            <span className="font-medium text-gray-700">Criar Notícia</span>
                        </Link>
                        <Link href="/admin/avisos" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex flex-col items-center justify-center gap-2 text-center">
                            <Bell size={24} className="text-gray-500" />
                            <span className="font-medium text-gray-700">Novo Aviso</span>
                        </Link>
                        <Link href="/admin/agenda" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex flex-col items-center justify-center gap-2 text-center">
                            <Calendar size={24} className="text-gray-500" />
                            <span className="font-medium text-gray-700">Adicionar Evento</span>
                        </Link>
                        <Link href="/admin/usuarios" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition flex flex-col items-center justify-center gap-2 text-center">
                            <Users size={24} className="text-gray-500" />
                            <span className="font-medium text-gray-700">Gerenciar Usuários</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
