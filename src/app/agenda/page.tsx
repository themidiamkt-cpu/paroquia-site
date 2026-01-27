import { PageLayout } from "@/components/ui/PageLayout";
import { Calendar } from "@/components/home/Calendar";

export default function AgendaPage() {
    return (
        <PageLayout title="Agenda Paroquial" subtitle="Confira os próximos eventos e atividades da nossa paróquia.">
            <div className="-mt-8">
                <Calendar />
            </div>
        </PageLayout>
    );
}
