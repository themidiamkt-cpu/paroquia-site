import { getBioLinksPublic, getBioSettings } from "@/lib/actions";
import {
    Link as LinkIcon, Instagram, Facebook, Youtube, Phone, Mail, MapPin, Music,
    Heart, BookOpen, Calendar, MessageCircle, Globe, Church,
    Users, HandHeart, Baby, Cross, Sparkles, ExternalLink,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
    link: LinkIcon, instagram: Instagram, facebook: Facebook, youtube: Youtube,
    phone: Phone, mail: Mail, "map-pin": MapPin, music: Music, heart: Heart,
    "book-open": BookOpen, calendar: Calendar, "message-circle": MessageCircle,
    globe: Globe, church: Church, users: Users, "hand-heart": HandHeart,
    baby: Baby, cross: Cross, sparkles: Sparkles, "external-link": ExternalLink,
};

function getIcon(name: string) {
    return ICON_MAP[name] || LinkIcon;
}

interface BioLink {
    id: number;
    title: string;
    url: string;
    icon: string;
    display_order: number;
    active: boolean;
    highlight: boolean;
}

function formatUrl(url: string) {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("mailto:") || url.startsWith("tel:")) {
        return url;
    }
    // Handle common cases like wa.me, instagram.com without prefix
    return `https://${url}`;
}

interface BioSettingsData {
    logo_url: string | null;
    title: string;
    subtitle: string;
    instagram_handle: string;
}

export default async function BioPage() {
    const [links, settings] = await Promise.all([
        getBioLinksPublic(),
        getBioSettings(),
    ]);

    const bioLinks = links as BioLink[];
    const bioSettings = settings as BioSettingsData;

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12 px-4"
            style={{
                background: "linear-gradient(145deg, #0a1e33 0%, #0F2A44 30%, #1a3a5c 55%, #4a3520 80%, #9C7A1A 100%)",
            }}
        >
            {/* Animated background orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl"
                    style={{ animation: "float 20s ease-in-out infinite" }} />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl"
                    style={{ animation: "float 25s ease-in-out infinite reverse" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
            </div>

            {/* Main Card */}
            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8"
                    style={{ animation: "fadeInUp 0.6s ease-out both" }}
                >
                    {/* Logo */}
                    {bioSettings.logo_url ? (
                        <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-3 border-white/20 shadow-2xl mb-4 backdrop-blur-sm bg-white/10">
                            <img
                                src={bioSettings.logo_url}
                                alt={bioSettings.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ) : (
                        <div className="mx-auto w-24 h-24 rounded-full border-3 border-white/20 shadow-2xl mb-4 backdrop-blur-sm bg-white/10 flex items-center justify-center">
                            <Church size={36} className="text-white/60" />
                        </div>
                    )}

                    {/* Name */}
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        {bioSettings.title}
                    </h1>

                    {/* Subtitle */}
                    {bioSettings.subtitle && (
                        <p className="text-sm text-white/60 mt-1.5 font-medium">
                            {bioSettings.subtitle}
                        </p>
                    )}
                </div>

                {/* Links */}
                <div className="space-y-3">
                    {bioLinks.map((link, index) => {
                        const Icon = getIcon(link.icon);
                        const isHighlight = link.highlight;

                        return (
                            <a
                                key={link.id}
                                href={formatUrl(link.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all duration-300 ${isHighlight
                                    ? "bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-white shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]"
                                    : "bg-white/10 backdrop-blur-md text-white border border-white/10 hover:bg-white/18 hover:border-white/20 hover:scale-[1.02]"
                                    }`}
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${0.1 + index * 0.08}s both`,
                                }}
                            >
                                {/* Icon */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isHighlight
                                    ? "bg-white/20"
                                    : "bg-white/10 group-hover:bg-white/15"
                                    }`}>
                                    <Icon size={18} />
                                </div>

                                {/* Title */}
                                <span className="flex-1 font-semibold text-sm tracking-wide">
                                    {link.title}
                                </span>

                                {/* Arrow */}
                                <ExternalLink
                                    size={14}
                                    className={`shrink-0 transition-all group-hover:translate-x-0.5 ${isHighlight ? "text-white/60" : "text-white/30 group-hover:text-white/50"
                                        }`}
                                />

                                {/* Highlight glow */}
                                {isHighlight && (
                                    <div className="absolute inset-0 rounded-2xl bg-amber-400/10 blur-xl -z-10" />
                                )}
                            </a>
                        );
                    })}
                </div>

                {/* Empty state */}
                {bioLinks.length === 0 && (
                    <div className="text-center py-12"
                        style={{ animation: "fadeInUp 0.6s ease-out 0.2s both" }}
                    >
                        <LinkIcon size={32} className="mx-auto mb-3 text-white/20" />
                        <p className="text-white/40 text-sm">Nenhum link disponível no momento.</p>
                    </div>
                )}

                {/* Instagram Embed */}
                {bioSettings.instagram_handle && (
                    <div className="mt-8"
                        style={{ animation: "fadeInUp 0.5s ease-out 0.6s both" }}
                    >
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
                            {/* Header */}
                            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 flex items-center justify-center">
                                    <Instagram size={20} className="text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white font-semibold text-sm">Instagram</p>
                                    <p className="text-white/50 text-xs">@{bioSettings.instagram_handle}</p>
                                </div>
                                <a
                                    href={`https://instagram.com/${bioSettings.instagram_handle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold rounded-lg transition"
                                >
                                    Seguir
                                </a>
                            </div>
                            {/* Embed iframe */}
                            <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                                <iframe
                                    src={`https://www.instagram.com/${bioSettings.instagram_handle}/embed`}
                                    className="absolute inset-0 w-full h-full border-0"
                                    scrolling="no"
                                    allowTransparency={true}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="text-center mt-10"
                    style={{ animation: "fadeInUp 0.5s ease-out 0.8s both" }}
                >
                    <p className="text-xs text-white/25">
                        {bioSettings.title}
                    </p>
                </div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes float {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -30px) scale(1.05); }
                    66% { transform: translate(-20px, 20px) scale(0.95); }
                }
            `}</style>
        </div>
    );
}
