const BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export interface SiteSettings {
  site_name: string;
  hero_slogan: string;
  hero_video_url: string;
  mission_text: string;
  address: string;
  email: string;
  phone: string;
  linkedin_url: string;
  tiktok_url: string;
  youtube_url: string;
}

// Nettoie les URLs au format markdown [texte](url) renvoyées par l'API
const cleanUrl = (val: string): string => {
  const match = val.match(/\[.*?\]\((.*?)\)/);
  return match ? match[1] : val.trim();
};

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const res = await fetch(`${BASE}/api/core/settings/`);
  if (!res.ok) throw new Error("Erreur chargement site settings");
  const data: SiteSettings = await res.json();
  return {
    ...data,
    email:        cleanUrl(data.email),
    linkedin_url: cleanUrl(data.linkedin_url),
    tiktok_url:   cleanUrl(data.tiktok_url),
    youtube_url:  cleanUrl(data.youtube_url),
    hero_video_url: cleanUrl(data.hero_video_url),
  };
}