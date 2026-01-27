"use client";

import { useState } from "react";
import { Hammer } from "lucide-react";
import { PixModal } from "@/components/ui/PixModal";

export function HelpReformButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary text-white px-8 py-3 rounded-sm font-bold hover:bg-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
                <Hammer size={18} />
                QUERO AJUDAR
            </button>

            <PixModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
