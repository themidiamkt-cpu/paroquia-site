import { LoginSubmitButton } from "./LoginSubmitButton";
import { login } from "./actions";

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    const params = await searchParams;
    const error = params.error;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">Acesso Administrativo</h1>
                    <p className="text-gray-500 mt-2">Digite suas credenciais para entrar</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-6 border border-red-200">
                        {error}
                    </div>
                )}

                <form action={login} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary outline-none transition-all"
                            placeholder="seu@email.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Senha
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-secondary focus:border-secondary outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    <LoginSubmitButton />
                </form>
            </div>
        </div>
    );
}
