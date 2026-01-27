
import { PageLayout } from "@/components/ui/PageLayout";
import { GenericForm } from "@/components/ui/GenericForm";

export default function IntencaoMissaPage() {
    return (
        <PageLayout title="Intenção de Missa">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm">
                <GenericForm
                    formName="intencao-missa"
                    submitLabel="Enviar Intenção"
                    fields={[
                        { name: "intencao_para", label: "Intenção para (Nome)", type: "text", required: true },
                        { name: "tipo_intencao", label: "Tipo", type: "select", options: ["Falecimento (7º dia)", "Falecimento (Outros)", "Ação de Graças", "Aniversário", "Saúde", "Outros"], required: true },
                        { name: "data_missa", label: "Data Desejada", type: "date", required: true },
                        { name: "solicitante", label: "Seu Nome", type: "text", required: true },
                    ]}
                />
            </div>
        </PageLayout>
    );
}
