"use server";

import { supabaseAdmin } from "./supabase-admin";
import { revalidatePath } from "next/cache";

export async function seedDatabase() {
    console.log("Seeding database...");

    // --- PASTORALS ---
    const pastorals = [
        {
            name: "Catequese",
            description: "Iniciação à vida cristã para crianças, jovens e adultos.",
            contact: "Sábados, 09h",
            coordinator: "Coordenação Catequese"
        },
        {
            name: "Jovens (Jovens Sarados)",
            description: "Encontros semanais de oração e fraternidade para a juventude.",
            contact: "Domingos, 18h",
            coordinator: "Liderança Jovem"
        },
        {
            name: "Pascom",
            description: "Pastoral da Comunicação, responsável pela evangelização digital.",
            contact: "Reuniões Mensais",
            coordinator: "Coordenação Pascom"
        },
    ];

    for (const p of pastorals) {
        const { error } = await supabaseAdmin.from("pastorals").insert([p]);
        if (error) console.error("Error seeding pastoral:", p.name, error.message);
    }

    // --- SCHEDULES (MASSES) ---
    const schedules = [
        { day_of_week: "Quarta-feira", time: "15:00", description: "Santa Missa com Novena do Perpétuo Socorro", type: "missa" },
        { day_of_week: "Quinta-feira", time: "20:00", description: "Santa Missa com Novena de N. Sra. Desatadora dos Nós", type: "missa" },
        { day_of_week: "Sábado", time: "20:00", description: "Santa Missa Dominical (Vigília)", type: "missa" },
        { day_of_week: "Domingo", time: "09:15", description: "Santa Missa Dominical", type: "missa" },

        // Confessions
        { day_of_week: "Terça-feira", time: "08:00", description: "Confissões (até 12h)", type: "confissao" },
        { day_of_week: "Terça-feira", time: "14:00", description: "Confissões (até 17h)", type: "confissao" },
        { day_of_week: "Quinta-feira", time: "08:00", description: "Confissões (até 12h)", type: "confissao" },
        { day_of_week: "Quinta-feira", time: "14:00", description: "Confissões (até 17h)", type: "confissao" },
        { day_of_week: "Sábado", time: "08:00", description: "Confissões (até 12h)", type: "confissao" },
    ];

    for (const s of schedules) {
        const { error } = await supabaseAdmin.from("schedules").insert([s]);
        if (error) console.error("Error seeding schedule:", s.description, error.message);
    }

    // --- NEWS (Sample) ---
    const news = [
        { title: "Bem-vindo ao novo site!", content: "É com alegria que lançamos nosso novo portal paroquial.", published: true },
        { title: "Inscrições para Catequese", content: "As inscrições estão abertas para o ano de 2026. Procure a secretaria.", published: true }
    ];

    for (const n of news) {
        const { error } = await supabaseAdmin.from("news").insert([n]);
        if (error) console.error("Error seeding news:", n.title, error.message);
    }

    console.log("Seeding complete.");
    revalidatePath("/admin");
}
