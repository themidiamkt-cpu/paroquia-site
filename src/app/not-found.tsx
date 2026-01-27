import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 font-sans text-center">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border-t-4 border-primary">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-50 p-4 rounded-full">
                        <AlertCircle size={48} className="text-secondary" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Página não encontrada</h1>
                <p className="text-gray-600 mb-8">
                    Ocorreu um erro ou a página que você está procurando não existe.
                </p>
                <div className="space-y-3">
                    <Link
                        href="/"
                        className="block w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition"
                    >
                        Voltar para o Início
                    </Link>
                    <Link
                        href="/contato"
                        className="block w-full bg-white text-gray-700 border border-gray-200 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
                    >
                        Fale Conosco
                    </Link>
                </div>
            </div>
        </div>
    );
}
