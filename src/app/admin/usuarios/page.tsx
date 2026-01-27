"use client";

import { useState, useEffect } from "react";
import { getUsers, inviteUser, deleteUser } from "@/lib/actions";
import { Plus, Trash, Mail, ShieldAlert } from "lucide-react";

interface User {
    id: string;
    email?: string;
    last_sign_in_at?: string;
    created_at: string;
    user_metadata?: {
        role?: string;
    };
}

export default function AdminUsuariosPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [isInviting, setIsInviting] = useState(false);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Administrador");
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        setLoading(true);
        const data = await getUsers();
        setUsers(data || []);
        setLoading(false);
    }

    async function handleInvite() {
        if (!email) return;

        try {
            setMessage("Enviando convite...");
            await inviteUser(email, role);
            setMessage("Convite enviado com sucesso!");
            setEmail("");
            setRole("Administrador");
            setTimeout(() => {
                setIsInviting(false);
                setMessage("");
                fetchUsers();
            }, 2000);
        } catch (error) {
            console.error(error);
            setMessage("Erro ao enviar convite. Verifique os logs.");
        }
    }

    async function handleDelete(id: string) {
        if (!confirm("Tem certeza que deseja remover este usuário? Ele perderá o acesso imediatamente.")) return;
        await deleteUser(id);
        fetchUsers();
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Usuários do Sistema</h1>
                <button
                    onClick={() => setIsInviting(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                >
                    <Plus size={18} /> Convidar Usuário
                </button>
            </div>

            {isInviting && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 border-l-4 border-l-primary">
                    <h2 className="font-bold mb-4">Convidar Novo Usuário</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium mb-1">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="usuario@email.com"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label className="block text-sm font-medium mb-1">Perfil de Acesso</label>
                            <select
                                value={role}
                                onChange={e => setRole(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="Administrador">Administrador</option>
                                <option value="Secretaria">Secretaria</option>
                                <option value="PASCOM">PASCOM</option>
                                <option value="Diretor Espiritual">Diretor Espiritual</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleInvite}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2 flex-1 justify-center"
                            >
                                <Mail size={18} /> Enviar
                            </button>
                            <button
                                onClick={() => setIsInviting(false)}
                                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                    {message && <p className="mt-2 text-sm font-medium text-blue-600">{message}</p>}
                    <p className="mt-4 text-xs text-gray-500">
                        O usuário receberá um e-mail com instruções para definir a senha.
                    </p>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Usuário / E-mail</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Perfil</th>
                            <th className="text-left py-3 px-6 font-semibold text-gray-600">Último Acesso</th>
                            <th className="text-right py-3 px-6 font-semibold text-gray-600">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading ? (
                            <tr><td colSpan={4} className="p-6 text-center">Carregando...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={4} className="p-6 text-center text-gray-500">Nenhum usuário encontrado.</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="py-3 px-6">
                                        <div className="font-medium">{user.email}</div>
                                        <div className="text-xs text-gray-400">Criado em {new Date(user.created_at).toLocaleDateString()}</div>
                                    </td>
                                    <td className="py-3 px-6">
                                        <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wide 
                                            ${user.user_metadata?.role === 'Administrador' ? 'bg-purple-100 text-purple-700' :
                                                user.user_metadata?.role === 'PASCOM' ? 'bg-blue-100 text-blue-700' :
                                                    user.user_metadata?.role === 'Secretaria' ? 'bg-orange-100 text-orange-700' :
                                                        'bg-gray-100 text-gray-700'}`}>
                                            {user.user_metadata?.role || "Usuário"}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-sm text-gray-500">
                                        {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : 'Nunca acessou'}
                                    </td>
                                    <td className="py-3 px-6 text-right">
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="text-red-600 hover:text-red-800 flex items-center gap-1 ml-auto"
                                            title="Revogar acesso"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-3 text-yellow-800 text-sm">
                <ShieldAlert size={20} className="shrink-0" />
                <div>
                    <p className="font-bold">Atenção com permissões</p>
                    <p>Todos os usuários listados têm acesso ao painel. Futuramente, as permissões podem ser restritas baseadas no nível de acesso.</p>
                </div>
            </div>
        </div>
    );
}
