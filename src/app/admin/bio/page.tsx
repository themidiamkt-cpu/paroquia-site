"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    getBioLinks,
    createBioLink,
    updateBioLink,
    deleteBioLink,
    reorderBioLinks,
    toggleBioLinkActive,
    toggleBioLinkHighlight,
    getBioSettings,
    updateBioSettings,
    uploadBioLogo,
} from "@/lib/actions";
import {
    Plus, Trash2, Edit3, Save, X, GripVertical, Star, Eye, EyeOff,
    Loader2, Upload, Settings, Link as LinkIcon, ExternalLink,
    Instagram, Facebook, Youtube, Phone, Mail, MapPin, Music,
    Heart, BookOpen, Calendar, MessageCircle, Globe, Church,
    Users, HandHeart, Baby, Cross, Sparkles,
} from "lucide-react";

// ── Icon registry ──────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
    link: LinkIcon, instagram: Instagram, facebook: Facebook, youtube: Youtube,
    phone: Phone, mail: Mail, "map-pin": MapPin, music: Music, heart: Heart,
    "book-open": BookOpen, calendar: Calendar, "message-circle": MessageCircle,
    globe: Globe, church: Church, users: Users, "hand-heart": HandHeart,
    baby: Baby, cross: Cross, sparkles: Sparkles, "external-link": ExternalLink,
};

const ICON_LIST = Object.keys(ICON_MAP);

function getIcon(name: string) {
    return ICON_MAP[name] || LinkIcon;
}

// ── Types ──────────────────────────────────────────────────────
interface BioLink {
    id: number;
    title: string;
    url: string;
    icon: string;
    display_order: number;
    active: boolean;
    highlight: boolean;
    created_at: string;
}

interface BioSettingsData {
    id: number;
    logo_url: string | null;
    title: string;
    subtitle: string;
    instagram_handle: string;
}

// ── Toggle Switch component ────────────────────────────────────
function Toggle({ checked, onChange, label, color = "blue" }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    color?: string;
}) {
    const bg = checked
        ? color === "yellow" ? "bg-amber-400" : "bg-blue-500"
        : "bg-gray-300";
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className="flex items-center gap-2 group"
            title={label}
        >
            <div className={`relative w-10 h-5 rounded-full transition-colors ${bg}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : ""}`} />
            </div>
            <span className="text-xs text-gray-500 group-hover:text-gray-700 hidden sm:inline">{label}</span>
        </button>
    );
}

// ── Main Page ──────────────────────────────────────────────────
export default function AdminBioPage() {
    const [links, setLinks] = useState<BioLink[]>([]);
    const [settings, setSettings] = useState<BioSettingsData>({
        id: 1, logo_url: null, title: "Paróquia São Pio X", subtitle: "", instagram_handle: "",
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state
    const [isEditing, setIsEditing] = useState(false);
    const [editingLink, setEditingLink] = useState<Partial<BioLink>>({});
    const [showSettings, setShowSettings] = useState(false);
    const [uploadingLogo, setUploadingLogo] = useState(false);

    // Drag state
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const [linksData, settingsData] = await Promise.all([
            getBioLinks(),
            getBioSettings(),
        ]);
        setLinks(linksData as BioLink[]);
        setSettings(settingsData as BioSettingsData);
        setLoading(false);
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    // ── CRUD handlers ──────────────────────────────────────────
    async function handleSaveLink() {
        if (!editingLink.title || !editingLink.url) {
            alert("Título e URL são obrigatórios.");
            return;
        }
        setSaving(true);
        const fd = new FormData();
        fd.append("title", editingLink.title);
        fd.append("url", editingLink.url);
        fd.append("icon", editingLink.icon || "link");
        fd.append("highlight", String(editingLink.highlight ?? false));

        if (editingLink.id) {
            await updateBioLink(editingLink.id, fd);
        } else {
            await createBioLink(fd);
        }
        setIsEditing(false);
        setEditingLink({});
        setSaving(false);
        fetchData();
    }

    async function handleDelete(id: number) {
        if (!confirm("Excluir este link?")) return;
        await deleteBioLink(id);
        fetchData();
    }

    async function handleToggleActive(id: number, current: boolean) {
        await toggleBioLinkActive(id, !current);
        setLinks(prev => prev.map(l => l.id === id ? { ...l, active: !current } : l));
    }

    async function handleToggleHighlight(id: number, current: boolean) {
        await toggleBioLinkHighlight(id, !current);
        setLinks(prev => prev.map(l => l.id === id ? { ...l, highlight: !current } : l));
    }

    // ── Drag & Drop ────────────────────────────────────────────
    function handleDragStart(index: number) {
        dragItem.current = index;
    }

    function handleDragEnter(index: number) {
        dragOverItem.current = index;
    }

    async function handleDragEnd() {
        if (dragItem.current === null || dragOverItem.current === null) return;
        const reordered = [...links];
        const [removed] = reordered.splice(dragItem.current, 1);
        reordered.splice(dragOverItem.current, 0, removed);
        dragItem.current = null;
        dragOverItem.current = null;
        setLinks(reordered);
        await reorderBioLinks(reordered.map(l => l.id));
    }

    // ── Settings handlers ──────────────────────────────────────
    async function handleSaveSettings() {
        setSaving(true);
        const fd = new FormData();
        fd.append("title", settings.title);
        fd.append("subtitle", settings.subtitle);
        fd.append("logo_url", settings.logo_url || "");
        fd.append("instagram_handle", settings.instagram_handle || "");
        await updateBioSettings(fd);
        setSaving(false);
        setShowSettings(false);
    }

    async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files?.length) return;
        setUploadingLogo(true);
        try {
            const fd = new FormData();
            fd.append("file", e.target.files[0]);
            const result = await uploadBioLogo(fd);
            if (result.ok && result.url) {
                setSettings(prev => ({ ...prev, logo_url: result.url! }));
            } else {
                alert(result.error || "Erro ao enviar logo.");
            }
        } catch (err) {
            alert(err instanceof Error ? err.message : "Erro ao enviar logo.");
        }
        setUploadingLogo(false);
    }

    // ── Render ─────────────────────────────────────────────────
    return (
        <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Bio / Links</h1>
                    <p className="text-sm text-gray-500 mt-1">Gerencie os links da página pública /bio</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-600"
                    >
                        <Settings size={16} /> Configurações
                    </button>
                    <button
                        onClick={() => { setIsEditing(true); setEditingLink({ icon: "link", highlight: false }); }}
                        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition text-sm font-medium"
                    >
                        <Plus size={16} /> Novo Link
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6 animate-in">
                    <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Settings size={18} className="text-gray-400" /> Configurações da Bio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Logo</label>
                            <div className="flex items-center gap-4">
                                {settings.logo_url && (
                                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 shrink-0">
                                        <img src={settings.logo_url} alt="Logo" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    {uploadingLogo
                                        ? <Loader2 size={16} className="animate-spin text-gray-500" />
                                        : <Upload size={16} className="text-gray-500" />}
                                    <span className="text-sm text-gray-600">
                                        {uploadingLogo ? "Enviando..." : "Enviar Logo"}
                                    </span>
                                    <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} disabled={uploadingLogo} />
                                </label>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                            <input
                                type="text"
                                value={settings.title}
                                onChange={e => setSettings(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="Paróquia São Pio X"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Frase / Subtítulo</label>
                            <input
                                type="text"
                                value={settings.subtitle}
                                onChange={e => setSettings(prev => ({ ...prev, subtitle: e.target.value }))}
                                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="Campinas/SP"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Instagram (usuário)</label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-400">@</span>
                                <input
                                    type="text"
                                    value={settings.instagram_handle}
                                    onChange={e => setSettings(prev => ({ ...prev, instagram_handle: e.target.value.replace('@', '') }))}
                                    className="flex-1 p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="paroquiaspx"
                                />
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Se preenchido, um widget do Instagram aparecerá na página /bio</p>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button onClick={() => setShowSettings(false)} className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveSettings}
                            disabled={saving}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-60"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Salvar
                        </button>
                    </div>
                </div>
            )}

            {/* Add / Edit Form */}
            {isEditing && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
                    <h2 className="font-bold text-gray-800 mb-4">
                        {editingLink.id ? "Editar Link" : "Novo Link"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Título do Botão</label>
                            <input
                                type="text"
                                value={editingLink.title || ""}
                                onChange={e => setEditingLink(prev => ({ ...prev, title: e.target.value }))}
                                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="Ex: Nosso Instagram"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1">Link (URL ou WhatsApp)</label>
                            <input
                                type="text"
                                value={editingLink.url || ""}
                                onChange={e => setEditingLink(prev => ({ ...prev, url: e.target.value }))}
                                className="w-full p-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="https://instagram.com/... ou https://wa.me/..."
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-2">Ícone</label>
                            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
                                {ICON_LIST.map(iconName => {
                                    const Icon = ICON_MAP[iconName];
                                    const isSelected = editingLink.icon === iconName;
                                    return (
                                        <button
                                            key={iconName}
                                            type="button"
                                            onClick={() => setEditingLink(prev => ({ ...prev, icon: iconName }))}
                                            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition text-xs ${isSelected
                                                ? "border-primary bg-primary/5 text-primary font-medium"
                                                : "border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600"
                                                }`}
                                            title={iconName}
                                        >
                                            <Icon size={18} />
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="md:col-span-2 flex items-center gap-3 pt-2">
                            <Toggle
                                checked={editingLink.highlight ?? false}
                                onChange={v => setEditingLink(prev => ({ ...prev, highlight: v }))}
                                label="Destaque"
                                color="yellow"
                            />
                            <span className="text-xs text-gray-400">Links em destaque aparecerão com estilo especial</span>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={() => { setIsEditing(false); setEditingLink({}); }}
                            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleSaveLink}
                            disabled={saving}
                            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-60"
                        >
                            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Salvar
                        </button>
                    </div>
                </div>
            )}

            {/* Links List */}
            <div className="space-y-2">
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
                        <Loader2 size={24} className="animate-spin mx-auto mb-2" />
                        Carregando...
                    </div>
                ) : links.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <LinkIcon size={32} className="mx-auto mb-3 text-gray-300" />
                        <p className="text-gray-500 font-medium">Nenhum link cadastrado</p>
                        <p className="text-sm text-gray-400 mt-1">Clique em &quot;Novo Link&quot; para começar</p>
                    </div>
                ) : (
                    links.map((link, index) => {
                        const Icon = getIcon(link.icon);
                        return (
                            <div
                                key={link.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragEnter={() => handleDragEnter(index)}
                                onDragEnd={handleDragEnd}
                                onDragOver={e => e.preventDefault()}
                                className={`bg-white rounded-xl shadow-sm border transition-all group ${link.highlight
                                    ? "border-amber-200 bg-amber-50/30"
                                    : "border-gray-100"
                                    } ${!link.active ? "opacity-60" : ""}`}
                            >
                                <div className="flex items-center gap-3 p-4">
                                    {/* Drag handle */}
                                    <div className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-500 shrink-0">
                                        <GripVertical size={18} />
                                    </div>

                                    {/* Icon */}
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${link.highlight
                                        ? "bg-amber-100 text-amber-600"
                                        : "bg-gray-100 text-gray-500"
                                        }`}>
                                        <Icon size={18} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-gray-800 truncate">{link.title}</span>
                                            {link.highlight && (
                                                <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 truncate">{link.url}</p>
                                    </div>

                                    {/* Toggles */}
                                    <div className="flex items-center gap-3 shrink-0">
                                        <Toggle
                                            checked={link.active}
                                            onChange={() => handleToggleActive(link.id, link.active)}
                                            label={link.active ? "Ativo" : "Inativo"}
                                        />
                                        <Toggle
                                            checked={link.highlight}
                                            onChange={() => handleToggleHighlight(link.id, link.highlight)}
                                            label="Destaque"
                                            color="yellow"
                                        />
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 shrink-0">
                                        <button
                                            onClick={() => { setEditingLink(link); setIsEditing(true); }}
                                            className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                                            title="Editar"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(link.id)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                                            title="Excluir"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Preview Link */}
            {!loading && (
                <div className="mt-6 text-center">
                    <a
                        href="/bio"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                    >
                        <ExternalLink size={14} /> Ver página pública (/bio)
                    </a>
                </div>
            )}
        </div>
    );
}
