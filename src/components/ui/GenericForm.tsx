
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { sendToWebhook } from "@/lib/webhooks";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface Field {
    name: string;
    label: string;
    type: "text" | "email" | "tel" | "textarea" | "select" | "date";
    placeholder?: string;
    options?: string[]; // For select
    required?: boolean;
}

interface GenericFormProps {
    formName: string; // Used for webhook endpoint
    fields: Field[];
    submitLabel?: string;
    successMessage?: string;
}

export function GenericForm({ formName, fields, submitLabel = "Enviar", successMessage = "Formulário enviado com sucesso!" }: GenericFormProps) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const onSubmit = async (data: any) => {
        setStatus("loading");
        const result = await sendToWebhook(formName, data);

        if (result.success) {
            setStatus("success");
            reset();
        } else {
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <div className="bg-accent border border-blue-100 rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <CheckCircle2 className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">Sucesso!</h3>
                <p className="text-green-700">{successMessage}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                    Enviar novo
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded p-4 flex items-center gap-2 text-red-700">
                    <AlertCircle size={20} />
                    <p>Ocorreu um erro ao enviar. Tente novamente.</p>
                </div>
            )}

            {fields.map((field) => (
                <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>

                    {field.type === "textarea" ? (
                        <textarea
                            {...register(field.name, { required: field.required })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder={field.placeholder}
                            rows={4}
                        />
                    ) : field.type === "select" ? (
                        <select
                            {...register(field.name, { required: field.required })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        >
                            <option value="">Selecione...</option>
                            {field.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type={field.type}
                            {...register(field.name, { required: field.required })}
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder={field.placeholder}
                        />
                    )}
                    {errors[field.name] && <span className="text-xs text-red-500">Campo obrigatório</span>}
                </div>
            ))}

            <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-primary text-white font-bold py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-70 flex justify-center items-center gap-2 shadow-md"
            >
                {status === "loading" && <Loader2 className="animate-spin" size={20} />}
                {submitLabel}
            </button>
        </form>
    );
}
