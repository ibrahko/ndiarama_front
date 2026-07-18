import api from "./client";

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
  const res = await api.get<SiteSettings>("/core/settings/");
  const data = res.data;
  return {
    ...data,
    email:        cleanUrl(data.email),
    linkedin_url: cleanUrl(data.linkedin_url),
    tiktok_url:   cleanUrl(data.tiktok_url),
    youtube_url:  cleanUrl(data.youtube_url),
    hero_video_url: cleanUrl(data.hero_video_url),
  };
}