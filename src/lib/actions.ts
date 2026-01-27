"use server";

import { supabaseAdmin } from "./supabase-admin";
import { revalidatePath } from "next/cache";

// --- NEWS ---

export async function getNews() {
    const { data, error } = await supabaseAdmin
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching news:", error);
        return [];
    }
    return data;
}

export async function createNews(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image_url = formData.get("image_url") as string;
    const category = formData.get("category") as string || "Geral";
    const published = formData.get("published") === "true";

    const { error } = await supabaseAdmin
        .from("news")
        .insert([{ title, content, image_url, category, published }]);

    if (error) console.error("Error creating news:", error);
    revalidatePath("/admin/noticias");
    revalidatePath("/noticias");
    revalidatePath("/");
}

export async function updateNews(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const image_url = formData.get("image_url") as string;
    const category = formData.get("category") as string || "Geral";
    const published = formData.get("published") === "true";

    const { error } = await supabaseAdmin
        .from("news")
        .update({ title, content, image_url, category, published })
        .eq("id", id);

    if (error) console.error("Error updating news:", error);
    revalidatePath("/admin/noticias");
    revalidatePath("/noticias");
    revalidatePath("/");
}

export async function deleteNews(id: number) {
    const { error } = await supabaseAdmin.from("news").delete().eq("id", id);
    if (error) console.error("Error deleting news:", error);
    revalidatePath("/admin/noticias");
    revalidatePath("/noticias");
    revalidatePath("/");
}

// --- AGENDA (EVENTS) ---

export async function getEvents() {
    const { data, error } = await supabaseAdmin
        .from("events")
        .select("*")
        .order("event_date", { ascending: true });

    if (error) {
        console.error("Error fetching events:", error);
        return [];
    }
    return data;
}

export async function createEvent(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const event_date = formData.get("event_date") as string;
    const location = formData.get("location") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("events")
        .insert([{ title, description, event_date, location, image_url }]);

    if (error) console.error("Error creating event:", error);
    revalidatePath("/admin/agenda");
    revalidatePath("/agenda");
    revalidatePath("/");
}

export async function updateEvent(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const event_date = formData.get("event_date") as string;
    const location = formData.get("location") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("events")
        .update({ title, description, event_date, location, image_url })
        .eq("id", id);

    if (error) console.error("Error updating event:", error);
    revalidatePath("/admin/agenda");
    revalidatePath("/agenda");
    revalidatePath("/");
}

export async function deleteEvent(id: number) {
    const { error } = await supabaseAdmin.from("events").delete().eq("id", id);
    if (error) console.error("Error deleting event:", error);
    revalidatePath("/admin/agenda");
    revalidatePath("/agenda");
    revalidatePath("/");
}

// --- SCHEDULES (HORARIOS) ---

export async function getSchedules() {
    const { data, error } = await supabaseAdmin
        .from("schedules")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error("Error fetching schedules:", error);
        return [];
    }
    return data;
}

export async function createSchedule(formData: FormData) {
    const day_of_week = formData.get("day_of_week") as string;
    const time = formData.get("time") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;

    const { error } = await supabaseAdmin
        .from("schedules")
        .insert([{ day_of_week, time, description, type }]);

    if (error) console.error("Error creating schedule:", error);
    revalidatePath("/admin/horarios");
    revalidatePath("/");
}

export async function updateSchedule(id: number, formData: FormData) {
    const day_of_week = formData.get("day_of_week") as string;
    const time = formData.get("time") as string;
    const description = formData.get("description") as string;
    const type = formData.get("type") as string;

    const { error } = await supabaseAdmin
        .from("schedules")
        .update({ day_of_week, time, description, type })
        .eq("id", id);

    if (error) console.error("Error updating schedule:", error);
    revalidatePath("/admin/horarios");
    revalidatePath("/");
}

export async function deleteSchedule(id: number) {
    const { error } = await supabaseAdmin.from("schedules").delete().eq("id", id);
    if (error) console.error("Error deleting schedule:", error);
    revalidatePath("/admin/horarios");
    revalidatePath("/");
}

// --- NOTICES (AVISOS) ---

export async function getNotices() {
    const { data, error } = await supabaseAdmin
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching notices:", error);
        return [];
    }
    return data;
}

export async function getNoticeById(id: number) {
    const { data, error } = await supabaseAdmin
        .from("notices")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        // console.error("Error fetching notice:", error);
        return null;
    }
    return data;
}

export async function createNotice(formData: FormData) {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const is_urgent = formData.get("is_urgent") === "true";
    const expires_at = formData.get("expires_at") as string || null;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("notices")
        .insert([{ title, message, is_urgent, expires_at, image_url }]);

    if (error) console.error("Error creating notice:", error);
    revalidatePath("/admin/avisos");
    revalidatePath("/");
}

export async function updateNotice(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;
    const is_urgent = formData.get("is_urgent") === "true";
    const expires_at = formData.get("expires_at") as string || null;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("notices")
        .update({ title, message, is_urgent, expires_at, image_url })
        .eq("id", id);

    if (error) console.error("Error updating notice:", error);
    revalidatePath("/admin/avisos");
    revalidatePath("/");
}

export async function deleteNotice(id: number) {
    const { error } = await supabaseAdmin.from("notices").delete().eq("id", id);
    if (error) console.error("Error deleting notice:", error);
    revalidatePath("/admin/avisos");
    revalidatePath("/");
}

// --- PASTORALS ---

function slugify(text: string) {
    if (!text) return "";
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

export async function getPastorals() {
    const { data, error } = await supabaseAdmin
        .from("pastorals")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching pastorals:", error);
        return [];
    }
    return data;
}

export async function getPastoralById(id: number) {
    const { data, error } = await supabaseAdmin
        .from("pastorals")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        // console.error("Error fetching pastoral:", error);
        return null;
    }
    return data;
}

export async function getPastoralBySlug(slug: string) {
    const { data, error } = await supabaseAdmin
        .from("pastorals")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        // console.error("Error fetching pastoral by slug:", error);
        return null;
    }
    return data;
}

export async function createPastoral(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const coordinator = formData.get("coordinator") as string;
    const contact = formData.get("contact") as string;
    const image_url = formData.get("image_url") as string;
    const slug = slugify(name);

    const { error } = await supabaseAdmin
        .from("pastorals")
        .insert([{ name, description, coordinator, contact, image_url, slug }]);

    if (error) console.error("Error creating pastoral:", error);
    revalidatePath("/admin/pastorais");
    revalidatePath("/pastorais");
    revalidatePath("/");
}

export async function updatePastoral(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const coordinator = formData.get("coordinator") as string;
    const contact = formData.get("contact") as string;
    const image_url = formData.get("image_url") as string;
    const slug = slugify(name);

    const { error } = await supabaseAdmin
        .from("pastorals")
        .update({ name, description, coordinator, contact, image_url, slug })
        .eq("id", id);

    if (error) console.error("Error updating pastoral:", error);
    revalidatePath("/admin/pastorais");
    revalidatePath("/pastorais");
    revalidatePath("/");
    revalidatePath(`/pastorais/${slug}`);
}

export async function deletePastoral(id: number) {
    const { error } = await supabaseAdmin.from("pastorals").delete().eq("id", id);
    if (error) console.error("Error deleting pastoral:", error);
    revalidatePath("/admin/pastorais");
    revalidatePath("/pastorais");
    revalidatePath("/");
}

// --- PASTORAL MEMBERS ---

export async function getPastoralMembers(pastoralId: number) {
    const { data, error } = await supabaseAdmin
        .from("pastoral_members")
        .select("*")
        .eq("pastoral_id", pastoralId)
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching pastoral members:", error);
        return [];
    }
    return data;
}

export async function addPastoralMember(pastoralId: number, name: string, role: string) {
    const { error } = await supabaseAdmin
        .from("pastoral_members")
        .insert([{ pastoral_id: pastoralId, name, role }]);

    if (error) console.error("Error adding pastoral member:", error);
    revalidatePath("/admin/pastorais");
}

export async function deletePastoralMember(id: number) {
    const { error } = await supabaseAdmin.from("pastoral_members").delete().eq("id", id);
    if (error) console.error("Error deleting pastoral member:", error);
    revalidatePath("/admin/pastorais");
}

// --- REFORM UPDATES ---

export async function getReformUpdates() {
    const { data, error } = await supabaseAdmin
        .from("reform_updates")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching reform updates:", error);
        return [];
    }
    return data;
}

export async function createReformUpdate(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const percent_complete = Number(formData.get("percent_complete"));
    const stage = formData.get("stage") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("reform_updates")
        .insert([{ title, description, percent_complete, stage, image_url }]);

    if (error) console.error("Error creating reform update:", error);
    revalidatePath("/admin/reforma");
    revalidatePath("/reforma");
    revalidatePath("/");
}

export async function updateReformUpdate(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const percent_complete = Number(formData.get("percent_complete"));
    const stage = formData.get("stage") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("reform_updates")
        .update({ title, description, percent_complete, stage, image_url })
        .eq("id", id);

    if (error) console.error("Error updating reform update:", error);
    revalidatePath("/admin/reforma");
    revalidatePath("/reforma");
    revalidatePath("/");
}

export async function deleteReformUpdate(id: number) {
    const { error } = await supabaseAdmin.from("reform_updates").delete().eq("id", id);
    if (error) console.error("Error deleting reform update:", error);
    revalidatePath("/admin/reforma");
    revalidatePath("/reforma");
    revalidatePath("/");
}

// --- BANNERS ---

export async function getBanners() {
    const { data, error } = await supabaseAdmin
        .from("banners")
        .select("*")
        .order("desktop_order", { ascending: true });

    if (error) {
        console.error("Error fetching banners:", error);
        return [];
    }
    return data;
}

export async function createBanner(formData: FormData) {
    const title = formData.get("title") as string;
    const image_url = formData.get("image_url") as string;
    const link = formData.get("link") as string;
    const desktop_order = Number(formData.get("desktop_order")) || 0;
    const mobile_order = Number(formData.get("mobile_order")) || 0;
    const active = formData.get("active") === "true";

    const { error } = await supabaseAdmin
        .from("banners")
        .insert([{ title, image_url, link, desktop_order, mobile_order, active }]);

    if (error) console.error("Error creating banner:", error);
    revalidatePath("/admin/banners");
    revalidatePath("/");
}

export async function updateBanner(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const image_url = formData.get("image_url") as string;
    const link = formData.get("link") as string;
    const desktop_order = Number(formData.get("desktop_order"));
    const mobile_order = Number(formData.get("mobile_order"));
    const active = formData.get("active") === "true";

    const { error } = await supabaseAdmin
        .from("banners")
        .update({ title, image_url, link, desktop_order, mobile_order, active })
        .eq("id", id);

    if (error) console.error("Error updating banner:", error);
    revalidatePath("/admin/banners");
    revalidatePath("/");
}

export async function deleteBanner(id: number) {
    const { error } = await supabaseAdmin.from("banners").delete().eq("id", id);
    if (error) console.error("Error deleting banner:", error);
    revalidatePath("/admin/banners");
    revalidatePath("/");
}

// --- GALLERIES ---

export async function getGalleries() {
    const { data, error } = await supabaseAdmin
        .from("galleries")
        .select("*")
        .order("event_date", { ascending: false });

    if (error) {
        console.error("Error fetching galleries:", error);
        return [];
    }
    return data;
}

export async function createGallery(formData: FormData) {
    const title = formData.get("title") as string;
    const event_date = formData.get("event_date") as string;
    const description = formData.get("description") as string;
    const cover_image = formData.get("cover_image") as string;

    const { error } = await supabaseAdmin
        .from("galleries")
        .insert([{ title, event_date, description, cover_image }]);

    if (error) console.error("Error creating gallery:", error);
    revalidatePath("/admin/galeria");
    revalidatePath("/galeria");
}

export async function updateGallery(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const event_date = formData.get("event_date") as string;
    const description = formData.get("description") as string;
    const cover_image = formData.get("cover_image") as string;

    const { error } = await supabaseAdmin
        .from("galleries")
        .update({ title, event_date, description, cover_image })
        .eq("id", id);

    if (error) console.error("Error updating gallery:", error);
    revalidatePath("/admin/galeria");
    revalidatePath("/galeria");
}

export async function deleteGallery(id: number) {
    const { error } = await supabaseAdmin.from("galleries").delete().eq("id", id);
    if (error) console.error("Error deleting gallery:", error);
    revalidatePath("/admin/galeria");
    revalidatePath("/galeria");
}

// --- PAGES ---

export async function getPages() {
    const { data, error } = await supabaseAdmin
        .from("pages")
        .select("*")
        .order("title", { ascending: true });

    if (error) {
        console.error("Error fetching pages:", error);
        return [];
    }
    return data;
}

export async function getPageBySlug(slug: string) {
    const { data, error } = await supabaseAdmin
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error) {
        // console.error("Error fetching page:", error);
        return null;
    }
    return data;
}

export async function updatePage(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;

    const { error } = await supabaseAdmin
        .from("pages")
        .update({ title, content, slug, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) console.error("Error updating page:", error);
    revalidatePath("/admin/paginas");
    revalidatePath(`/${slug}`); // Revalidate the public page
}

export async function createPage(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const slug = formData.get("slug") as string;

    const { error } = await supabaseAdmin
        .from("pages")
        .insert([{ title, content, slug }]);

    if (error) console.error("Error creating page:", error);
    revalidatePath("/admin/paginas");
}

// --- GALLERY IMAGES ---

export async function getGalleryImages(galleryId: number) {
    const { data, error } = await supabaseAdmin
        .from("gallery_images")
        .select("*")
        .eq("gallery_id", galleryId)
        .order("display_order", { ascending: true });

    if (error) {
        console.error("Error fetching gallery images:", error);
        return [];
    }
    return data;
}

export async function createGalleryImage(formData: FormData) {
    const gallery_id = Number(formData.get("gallery_id"));
    const image_url = formData.get("image_url") as string;
    const display_order = Number(formData.get("display_order")) || 0;

    const { error } = await supabaseAdmin
        .from("gallery_images")
        .insert([{ gallery_id, image_url, display_order }]);

    if (error) console.error("Error creating gallery image:", error);
    revalidatePath("/admin/galeria");
    revalidatePath(`/admin/galeria/${gallery_id}`);
}

export async function deleteGalleryImage(id: number) {
    // First get the gallery id to revalidate
    const { data: img } = await supabaseAdmin.from("gallery_images").select("gallery_id").eq("id", id).single();

    const { error } = await supabaseAdmin.from("gallery_images").delete().eq("id", id);
    if (error) console.error("Error deleting gallery image:", error);

    if (img) {
        revalidatePath(`/admin/galeria/${img.gallery_id}`);
    }
    revalidatePath("/admin/galeria");
}

// --- FORM SUBMISSIONS ---

export async function getFormSubmissions() {
    const { data, error } = await supabaseAdmin
        .from("form_submissions")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching form submissions:", error);
        return [];
    }
    return data;
}

// --- USERS (AUTH) ---

export async function getUsers() {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();

    if (error) {
        console.error("Error fetching users:", error);
        return [];
    }
    return users;
}

export async function inviteUser(email: string, role: string = "Administrador") {
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
        data: { role }
    });

    if (error) {
        console.error("Error inviting user:", error);
        throw error;
    }
    revalidatePath("/admin/usuarios");
    return data;
}

export async function deleteUser(id: string) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);
    if (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
    revalidatePath("/admin/usuarios");
}

// --- DASHBOARD STATS ---

export async function getDashboardStats() {
    // Parallel processing for speed
    const [
        { count: newsCount },
        { count: eventsCount },
        { count: noticesCount },
        { count: pastoralsCount },
        { count: formsCount },
        { data: reforma }
    ] = await Promise.all([
        supabaseAdmin.from("news").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("events").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("notices").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("pastorals").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("form_submissions").select("*", { count: 'exact', head: true }),
        supabaseAdmin.from("reform_updates").select("percent_complete").order("created_at", { ascending: false }).limit(1).single()
    ]);

    return {
        newsCount: newsCount || 0,
        eventsCount: eventsCount || 0,
        noticesCount: noticesCount || 0,
        pastoralsCount: pastoralsCount || 0,
        formsCount: formsCount || 0,
        reformaPercent: reforma ? reforma.percent_complete : 0
    };
}

export async function updateGalleryImageOrder(id: number, order: number) {
    const { error } = await supabaseAdmin
        .from("gallery_images")
        .update({ display_order: order })
        .eq("id", id);

    const { data: img } = await supabaseAdmin.from("gallery_images").select("gallery_id").eq("id", id).single();
    if (img) {
        revalidatePath(`/admin/galeria/${img.gallery_id}`);
    }
}

export async function uploadImage(formData: FormData) {
    const file = formData.get("file") as File;
    const folder = formData.get("folder") as string || "uploads";

    if (!file) {
        throw new Error("No file uploaded");
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg'];
    const fileType = file.type || 'image/jpeg';

    if (!allowedTypes.includes(fileType.toLowerCase())) {
        throw new Error(`Tipo de arquivo não permitido: ${fileType}. Use JPG, PNG, WEBP ou GIF.`);
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        throw new Error("Arquivo muito grande. Máximo 10MB.");
    }

    try {
        // Ensure bucket exists (idempotent-ish)
        const { data: buckets } = await supabaseAdmin.storage.listBuckets();
        const bucketExists = buckets?.some(b => b.name === "sitePspx");

        if (!bucketExists) {
            // Try creating it if not exists. public: true is important for publicUrl
            await supabaseAdmin.storage.createBucket("sitePspx", {
                public: true,
                fileSizeLimit: 10485760, // 10MB
                allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
            });
        }

        const buffer = await file.arrayBuffer();
        // Sanitize filename but keep extension
        const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const cleanName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const path = `${folder}/${cleanName}`;

        const { data, error } = await supabaseAdmin
            .storage
            .from("sitePspx")
            .upload(path, buffer, {
                contentType: fileType,
                upsert: false
            });

        if (error) {
            console.error("Supabase Storage Upload Error:", error);
            throw new Error(`Upload failed: ${error.message}`);
        }

        const { data: { publicUrl } } = supabaseAdmin
            .storage
            .from("sitePspx")
            .getPublicUrl(path);

        return publicUrl;
    } catch (err: any) {
        console.error("Server Action Upload Error:", err);
        throw new Error(err.message || "Erro interno no upload");
    }
}

// --- PARTICIPATION FORM ---

// --- COMMUNITIES (COMUNIDADES) ---

export async function getCommunities() {
    const { data, error } = await supabaseAdmin
        .from("communities")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching communities:", error);
        return [];
    }
    return data;
}

export async function getCommunityById(id: number) {
    const { data, error } = await supabaseAdmin
        .from("communities")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        // console.error("Error fetching community:", error);
        return null;
    }
    return data;
}

export async function createCommunity(formData: FormData) {
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("communities")
        .insert([{ name, address, description, image_url }]);

    if (error) console.error("Error creating community:", error);
    revalidatePath("/admin/comunidades");
    revalidatePath("/comunidades");
    revalidatePath("/");
}

export async function updateCommunity(id: number, formData: FormData) {
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const description = formData.get("description") as string;
    const image_url = formData.get("image_url") as string;

    const { error } = await supabaseAdmin
        .from("communities")
        .update({ name, address, description, image_url, updated_at: new Date().toISOString() })
        .eq("id", id);

    if (error) console.error("Error updating community:", error);
    revalidatePath("/admin/comunidades");
    revalidatePath("/comunidades");
    revalidatePath("/");
}

export async function deleteCommunity(id: number) {
    const { error } = await supabaseAdmin.from("communities").delete().eq("id", id);
    if (error) console.error("Error deleting community:", error);
    revalidatePath("/admin/comunidades");
    revalidatePath("/comunidades");
    revalidatePath("/");
}

// --- COMMUNITY SCHEDULES ---

export async function getCommunitySchedules(communityId: number) {
    const { data, error } = await supabaseAdmin
        .from("community_schedules")
        .select("*")
        .eq("community_id", communityId)
        .order("day_of_week", { ascending: true })
        .order("time", { ascending: true });

    if (error) {
        console.error("Error fetching community schedules:", error);
        return [];
    }
    return data;
}

export async function createCommunitySchedule(formData: FormData) {
    const community_id = Number(formData.get("community_id"));
    const day_of_week = Number(formData.get("day_of_week"));
    const time = formData.get("time") as string;
    const type = formData.get("type") as string;
    const description = formData.get("description") as string;

    const { error } = await supabaseAdmin
        .from("community_schedules")
        .insert([{ community_id, day_of_week, time, type, description }]);

    if (error) console.error("Error creating community schedule:", error);
    revalidatePath(`/admin/comunidades/${community_id}`);
}

export async function deleteCommunitySchedule(id: number) {
    // First get the community id to revalidate
    const { data: schedule } = await supabaseAdmin.from("community_schedules").select("community_id").eq("id", id).single();

    const { error } = await supabaseAdmin.from("community_schedules").delete().eq("id", id);
    if (error) console.error("Error deleting community schedule:", error);

    if (schedule) {
        revalidatePath(`/admin/comunidades/${schedule.community_id}`);
    }
}

export async function getCommunityCoordinators(communityId: number) {
    const { data, error } = await supabaseAdmin
        .from("community_coordinators")
        .select("*")
        .eq("community_id", communityId)
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching community coordinators:", error);
        return [];
    }
    return data;
}



export async function sendParticipationData(data: {
    name: string;
    whatsapp: string;
    email: string;
    community: string;
    reason: string;
    pastoralName: string;
    coordinatorName?: string;
    coordinatorContact?: string;
}) {
    try {
        const response = await fetch("https://automacao2.themidiamarketing.com.br/webhook/pastorais", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Webhook error: ${response.statusText}`);
        }

        return { success: true };
    } catch (error: any) {
        console.error("Error sending participation data:", error);
        return { success: false, error: error.message };
    }
}

// --- DYNAMIC FORMS ---

export async function getForms() {
    const { data, error } = await supabaseAdmin
        .from("forms")
        .select("*")
        .order("title", { ascending: true });

    if (error) {
        console.error("Error fetching forms:", error);
        return [];
    }
    return data;
}

export async function getFormBySlug(slug: string) {
    const { data, error } = await supabaseAdmin
        .from("forms")
        .select(`
            *,
            fields:form_fields(*)
        `)
        .eq("slug", slug)
        .single();

    if (error) {
        // console.error("Error fetching form by slug:", error); // Silent fail for 404s
        return null;
    }

    // Sort fields by order_index
    if (data && data.fields) {
        data.fields.sort((a: any, b: any) => a.order_index - b.order_index);
    }

    return data;
}

export async function getFormById(id: number) {
    const { data, error } = await supabaseAdmin
        .from("forms")
        .select(`
            *,
            fields:form_fields(*)
        `)
        .eq("id", id)
        .single();

    if (error) {
        console.error("Error fetching form by id:", error);
        return null;
    }

    // Sort fields by order_index
    if (data && data.fields) {
        data.fields.sort((a: any, b: any) => a.order_index - b.order_index);
    }

    return data;
}

export async function createForm(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const submit_label = formData.get("submit_label") as string;
    const success_message = formData.get("success_message") as string;

    const { error } = await supabaseAdmin
        .from("forms")
        .insert([{ title, slug, description, submit_label, success_message }]);

    if (error) {
        console.error("Error creating form:", error);
        throw error;
    }
    revalidatePath("/admin/formularios");
}

export async function updateForm(id: number, formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const submit_label = formData.get("submit_label") as string;
    const success_message = formData.get("success_message") as string;

    const { error } = await supabaseAdmin
        .from("forms")
        .update({ title, slug, description, submit_label, success_message })
        .eq("id", id);

    if (error) {
        console.error("Error updating form:", error);
        throw error;
    }
    revalidatePath("/admin/formularios");
    revalidatePath(`/admin/formularios/gerenciar/${id}`);
}

export async function saveField(fieldData: any) {
    // If it has an ID, update. Else, insert.
    if (fieldData.id) {
        const { error } = await supabaseAdmin
            .from("form_fields")
            .update({
                label: fieldData.label,
                field_name: fieldData.field_name,
                field_type: fieldData.field_type,
                placeholder: fieldData.placeholder,
                required: fieldData.required,
                options: fieldData.options,
                order_index: fieldData.order_index
            })
            .eq("id", fieldData.id);

        if (error) throw error;
    } else {
        const { error } = await supabaseAdmin
            .from("form_fields")
            .insert([{
                form_id: fieldData.form_id,
                label: fieldData.label,
                field_name: fieldData.field_name,
                field_type: fieldData.field_type,
                placeholder: fieldData.placeholder,
                required: fieldData.required,
                options: fieldData.options,
                order_index: fieldData.order_index
            }]);

        if (error) throw error;
    }

    revalidatePath(`/admin/formularios/gerenciar/${fieldData.form_id}`);
}

export async function deleteField(id: number, formId: number) {
    const { error } = await supabaseAdmin
        .from("form_fields")
        .delete()
        .eq("id", id);

    if (error) throw error;
    revalidatePath(`/admin/formularios/gerenciar/${formId}`);
}

// --- MASS SCHEDULES ---

export async function getMassSchedules() {
    const { data, error } = await supabaseAdmin
        .from("mass_schedules")
        .select("*")
        .eq("is_active", true)
        .order("day_of_week", { ascending: true });

    if (error) {
        console.error("Error fetching mass schedules:", error);
        return [];
    }
    return data;
}

export async function getAllMassSchedules() {
    const { data, error } = await supabaseAdmin
        .from("mass_schedules")
        .select("*")
        .order("day_of_week", { ascending: true });

    if (error) {
        console.error("Error fetching all mass schedules:", error);
        return [];
    }
    return data;
}

export async function createMassSchedule(formData: FormData) {
    const day_of_week = Number(formData.get("day_of_week"));
    const time = formData.get("time") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string || "Igreja Matriz";
    const is_active = formData.get("is_active") === "true";

    const { error } = await supabaseAdmin
        .from("mass_schedules")
        .insert([{ day_of_week, time, title, description, location, is_active }]);

    if (error) console.error("Error creating mass schedule:", error);
    revalidatePath("/admin/missas");
    revalidatePath("/agenda");
    revalidatePath("/");
}

export async function updateMassSchedule(id: number, formData: FormData) {
    const day_of_week = Number(formData.get("day_of_week"));
    const time = formData.get("time") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string || "Igreja Matriz";
    const is_active = formData.get("is_active") === "true";

    const { error } = await supabaseAdmin
        .from("mass_schedules")
        .update({ day_of_week, time, title, description, location, is_active })
        .eq("id", id);

    if (error) console.error("Error updating mass schedule:", error);
    revalidatePath("/admin/missas");
    revalidatePath("/agenda");
    revalidatePath("/");
}

export async function deleteMassSchedule(id: number) {
    const { error } = await supabaseAdmin.from("mass_schedules").delete().eq("id", id);
    if (error) console.error("Error deleting mass schedule:", error);
    revalidatePath("/admin/missas");
    revalidatePath("/agenda");
    revalidatePath("/");
}
