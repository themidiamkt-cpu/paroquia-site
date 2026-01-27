"use client";

import { useEffect, useState } from "react";
import { getFormBySlug } from "@/lib/actions";
import { GenericForm } from "@/components/ui/GenericForm";

interface DynamicFormProps {
    slug: string;
}

export function DynamicForm({ slug }: DynamicFormProps) {
    const [formConfig, setFormConfig] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchConfig() {
            setLoading(true);
            const data = await getFormBySlug(slug);
            if (data) {
                setFormConfig(data);
            } else {
                setError(true);
            }
            setLoading(false);
        }

        fetchConfig();
    }, [slug]);

    if (loading) {
        return (
            <div className="p-12 text-center text-gray-500 bg-gray-50 rounded-lg animate-pulse">
                Carregando formulário...
            </div>
        );
    }

    if (error || !formConfig) {
        return (
            <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg border border-red-100">
                Formulário não encontrado ou erro ao carregar.
            </div>
        );
    }

    // Map database fields to GenericForm fields
    const mappedFields = formConfig.fields?.map((f: any) => ({
        name: f.field_name,
        label: f.label,
        type: f.field_type,
        placeholder: f.placeholder,
        required: f.required,
        options: f.options
    })) || [];

    return (
        <div>
            {formConfig.description && (
                <p className="mb-6 text-gray-600 border-b border-gray-100 pb-4">
                    {formConfig.description}
                </p>
            )}

            <GenericForm
                formName={slug} // Use slug as identifier for webhook/submissions
                fields={mappedFields}
                submitLabel={formConfig.submit_label}
                successMessage={formConfig.success_message}
            />
        </div>
    );
}
