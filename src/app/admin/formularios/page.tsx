"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { deleteFormSubmission, getFormSubmissions } from "@/lib/actions";
import { Download, Eye, Loader2, Search, Trash2, X } from "lucide-react";

type SubmissionValue = string | number | boolean | null;
type SubmissionData = Record<string, SubmissionValue>;

interface Submission {
    id: number;
    form_type: string;
    data: SubmissionData;
    created_at: string;
    status: string;
}

const fieldLabelMap: Record<string, string> = {
    ajuda: "Como deseja ajudar?",
    catholic_marriage: "Pais são casados na Igreja Católica?",
    child_age: "Idade da Criança",
    child_name: "Nome da Criança",
    community: "Comunidade",
    coordinatorContact: "Contato da coordenação",
    coordinatorName: "Coordenação",
    data_missa: "Data desejada",
    data_nascimento: "Data de nascimento",
    email: "E-mail",
    etapa: "Etapa",
    father_name: "Nome do Pai",
    intencao_para: "Intenção para",
    message: "Observações adicionais",
    mensagem: "Mensagem",
    mother_name: "Nome da Mãe",
    name: "Nome completo",
    neighborhood: "Bairro de residência",
    nome: "Seu nome",
    nome_catequizando: "Nome do catequizando",
    nome_responsavel: "Nome do responsável",
    phone: "Telefone / WhatsApp",
    pastoralName: "Pastoral",
    reason: "Motivo do interesse",
    solicitante: "Solicitante",
    subject: "Assunto",
    telefone: "Telefone",
    tipo_intencao: "Tipo da intenção",
    whatsapp: "WhatsApp",
};

const statusLabels: Record<string, string> = {
    archived: "Arquivado",
    new: "Novo",
    read: "Lido",
    webhook_failed: "Encaminhamento pendente",
};

const statusClasses: Record<string, string> = {
    archived: "bg-gray-100 text-gray-700",
    new: "bg-emerald-100 text-emerald-700",
    read: "bg-blue-100 text-blue-700",
    webhook_failed: "bg-amber-100 text-amber-800",
};

export default function AdminFormulariosPage() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [deletingSubmissionId, setDeletingSubmissionId] = useState<number | null>(null);

    useEffect(() => {
        async function fetchSubmissions() {
            setLoading(true);
            const data = await getFormSubmissions();
            setSubmissions(data || []);
            setLoading(false);
        }

        fetchSubmissions();
    }, []);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setSelectedSubmission(null);
            }
        }

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, []);

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

    async function handleDeleteSubmission(submission: Submission) {
        const confirmed = window.confirm(`Deseja apagar o formulário #${submission.id}? Essa ação não pode ser desfeita.`);

        if (!confirmed) {
            return;
        }

        try {
            setDeletingSubmissionId(submission.id);
            await deleteFormSubmission(submission.id);
            setSubmissions((currentSubmissions) =>
                currentSubmissions.filter((item) => item.id !== submission.id),
            );
            setSelectedSubmission(null);
        } catch (error) {
            console.error("Delete form submission error:", error);
            window.alert("Não foi possível apagar este formulário agora.");
        } finally {
            setDeletingSubmissionId(null);
        }
    }

    const filteredSubmissions = filter === "all"
        ? submissions
        : submissions.filter(s => s.form_type === filter);

    // Get unique types
    const types = Array.from(new Set(submissions.map(s => s.form_type)));

    return (
        <>
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
                    <Link
                        href="/admin/formularios/gerenciar"
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                    >
                        Gerenciar Formulários
                    </Link>
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
                                <tr
                                    key={item.id}
                                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => setSelectedSubmission(item)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" || event.key === " ") {
                                            event.preventDefault();
                                            setSelectedSubmission(item);
                                        }
                                    }}
                                    tabIndex={0}
                                    role="button"
                                    aria-label={`Abrir detalhes do formulário ${item.form_type} ${item.id}`}
                                >
                                    <td className="py-3 px-6 text-sm text-gray-500">#{item.id}</td>
                                    <td className="py-3 px-6 text-sm text-gray-500">
                                        {formatSubmissionDate(item.created_at)}
                                        <br />
                                        <span className="text-xs">{formatSubmissionTime(item.created_at)}</span>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">
                                            {item.form_type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="max-w-2xl text-gray-600">
                                                <p className="line-clamp-2">
                                                    {buildSubmissionPreview(item.data)}
                                                </p>
                                            </div>
                                            <span className="inline-flex shrink-0 items-center gap-2 text-primary font-medium">
                                                <Eye size={16} />
                                                Ver dados
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            </div>

            {selectedSubmission && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
                    onClick={() => setSelectedSubmission(null)}
                >
                    <div
                        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-5">
                            <div>
                                <div className="mb-3 flex flex-wrap items-center gap-2">
                                    <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                                        {selectedSubmission.form_type}
                                    </span>
                                    <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getStatusClassName(selectedSubmission.status)}`}>
                                        {getStatusLabel(selectedSubmission.status)}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Formulário #{selectedSubmission.id}
                                </h2>
                                <p className="mt-1 text-sm text-gray-500">
                                    Recebido em {formatSubmissionDate(selectedSubmission.created_at)} às {formatSubmissionTime(selectedSubmission.created_at)}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedSubmission(null)}
                                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
                                aria-label="Fechar detalhes"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                {Object.entries(selectedSubmission.data).map(([key, value]) => (
                                    <div key={key} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
                                            {formatFieldLabel(key)}
                                        </p>
                                        <p className="whitespace-pre-wrap break-words text-base font-medium text-gray-900">
                                            {formatFieldValue(value)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
                            <p className="text-sm text-gray-500">
                                Use esta opção apenas quando o envio realmente não precisar mais ficar salvo.
                            </p>
                            <button
                                type="button"
                                onClick={() => handleDeleteSubmission(selectedSubmission)}
                                disabled={deletingSubmissionId === selectedSubmission.id}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deletingSubmissionId === selectedSubmission.id ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" />
                                        Apagando...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 size={16} />
                                        Apagar formulário
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function buildSubmissionPreview(data: SubmissionData) {
    return Object.entries(data)
        .slice(0, 3)
        .map(([key, value]) => `${formatFieldLabel(key)}: ${formatFieldValue(value)}`)
        .join(" • ");
}

function formatFieldLabel(key: string) {
    if (fieldLabelMap[key]) {
        return fieldLabelMap[key];
    }

    return key
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatFieldValue(value: SubmissionValue) {
    if (value === null || value === "") {
        return "Não informado";
    }

    return String(value);
}

function formatSubmissionDate(value: string) {
    return new Date(value).toLocaleDateString("pt-BR");
}

function formatSubmissionTime(value: string) {
    return new Date(value).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

function getStatusLabel(status: string) {
    return statusLabels[status] || status;
}

function getStatusClassName(status: string) {
    return statusClasses[status] || "bg-gray-100 text-gray-700";
}
