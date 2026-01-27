"use client";

import { useState, useEffect } from "react";
import { getFormSubmissions } from "@/lib/actions";
import { Download, Inbox, Search } from "lucide-react";

interface Submission {
    id: number;
    form_type: string;
    data: any; // JSONB
    created_at: string;
    status: string;
}

export default function AdminFormulariosPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchSubmissions();
    }, []);

    async function fetchSubmissions() {
        setLoading(true);
        const data = await getFormSubmissions();
        setSubmissions(data || []);
        setLoading(false);
    }

    function downloadCSV() {
        if (submissions.length === 0) return;

        // Flatten data for CSV
        const csvRows = [];

        // Headers
        const headers = ["ID", "Data", "Tipo", "Status", "Dados"];
        csvRows.push(headers.join(","));

        // Rows
        submissions.forEach(item => {
            const row = [
                item.id,
                new Date(item.created_at).toLocaleDateString() + " " + new Date(item.created_at).toLocaleTimeString(),
                item.form_type,
                item.status,
                `"${JSON.stringify(item.data).replace(/"/g, '""')}"` // Escape quotes
            ];
            csvRows.push(row.join(","));
        });

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `solicitacoes_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const filteredSubmissions = filter === "all"
        ? submissions
        : submissions.filter(s => s.form_type === filter);

    // Get unique types
    const types = Array.from(new Set(submissions.map(s => s.form_type)));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Formulários Recebidos</h1>
                <div className="flex gap-2">
                    <button
                        onClick={downloadCSV}
                        disabled={submissions.length === 0}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Download size={18} /> Exportar CSV
                    </button>
                    <a
                        href="/admin/formularios/gerenciar"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        Gerenciar Formulários
                    </a>
                </div>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex gap-4 items-center">
                <Search size={20} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-600">Filtrar por:</span>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 border rounded-lg text-sm min-w-[200px]"
                >
                    <option value="all">Todos os tipos</option>
                    {types.map(t => (
                        <option key={t} value={t} className="capitalize">{t}</option>
                    ))}
                </select>
                <div className="ml-auto text-sm text-gray-500">
                    Total: <strong>{filteredSubmissions.length}</strong>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600 w-24">ID</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600 w-40">Data</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600 w-40">Tipo</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Resumo dos Dados</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center">Carregando...</td></tr>
                        ) : filteredSubmissions.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Nenhuma solicitação encontrada.</td></tr>
                        ) : (
                            filteredSubmissions.map(item => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6 text-sm text-gray-500">#{item.id}</td>
                                    <td className="py-3 px-6 text-sm text-gray-500">
                                        {new Date(item.created_at).toLocaleDateString()}
                                        <br />
                                        <span className="text-xs">{new Date(item.created_at).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                                            {item.form_type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-sm">
                                        <div className="max-w-2xl overflow-hidden text-ellipsis">
                                            {Object.entries(item.data).map(([key, value]) => (
                                                <span key={key} className="mr-4 inline-block">
                                                    <span className="font-semibold text-gray-600 capitalize">{key}:</span> {String(value)}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
