"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export function LoginSubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-secondary text-white py-2 px-4 rounded-md hover:bg-secondary/90 transition-colors font-medium flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {pending ? (
                <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Entrando...
                </>
            ) : (
                "Entrar"
            )}
        </button>
    );
}
