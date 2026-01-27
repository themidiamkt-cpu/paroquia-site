"use client";

import { useState } from "react";
import { ParticipateModal } from "@/components/pastorals/ParticipateModal";
import { Phone } from "lucide-react";

interface ParticipateButtonProps {
    pastoralName: string;
    coordinatorName?: string;
    coordinatorContact?: string;
    waLink?: string | null;
}

export function ParticipateButton({ pastoralName, coordinatorName, coordinatorContact, waLink }: ParticipateButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition flex items-center gap-2 font-bold cursor-pointer"
            >
                Quero Participar
            </button>

            <ParticipateModal
                pastoralName={pastoralName}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
