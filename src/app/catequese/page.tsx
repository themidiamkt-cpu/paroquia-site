
import { PageLayout } from "@/components/ui/PageLayout";
import { GenericForm } from "@/components/ui/GenericForm";

export default function CatequesePage() {
    return (
        <PageLayout title="Inscrição na Catequese">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
                <p className="mb-6 text-gray-600">
                    Inscrições abertas para a Catequese 2026.
                </p>
                <GenericForm
                    formName="catequese"
                    submitLabel="Realizar Inscrição"
                    fields={[
                        { name: "nome_catequizando", label: "Nome do Catequizando", type: "text", required: true },
                        { name: "data_nascimento", label: "Data de Nascimento", type: "date", required: true },
                        { name: "etapa", label: "Etapa", type: "select", options: ["Eucaristia I", "Eucaristia II", "Crisma", "Adultos"], required: true },
                        { name: "nome_responsavel", label: "Nome do Responsável", type: "text", required: true },
                        { name: "telefone", label: "Telefone", type: "tel", placeholder: "(00) 00000-0000", required: true },
                    ]}
                />
            </div>
        </PageLayout>
    );
}
