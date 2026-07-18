import api from "./client";
import { unwrapList, Paginated } from "./unwrap";

export interface CommunityFeature {
  id: number;
  title: string;
  description: string;
  telegram_link: string;
  show_newsletter_button: boolean;
  order: number;
  is_active: boolean;
}

export interface ProgramHighlight {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  external_link: string;
  order: number;
  is_active: boolean;
}

const cleanUrl = (url: string): string => {
  const match = url.match(/\[.*?\]\((.*?)\)/);
  if (match) return match[1];
  return url.trim();
};

export async function fetchCommunityFeatures(): Promise<CommunityFeature[]> {
  const res = await api.get<CommunityFeature[] | Paginated<CommunityFeature>>(
    "/community/features/"
  );
  const data = unwrapList(res.data);
  return data.map((f) => ({ ...f, telegram_link: cleanUrl(f.telegram_link) }));
}

export async function fetchProgramHighlights(): Promise<ProgramHighlight[]> {
  const res = await api.get<ProgramHighlight[] | Paginated<ProgramHighlight>>(
    "/community/programs/"
  );
  const data = unwrapList(res.data);
  return data.map((p) => ({ ...p, external_link: cleanUrl(p.external_link) }));
}

export interface SocialPost {
  id: number;
  platform: "linkedin" | "tiktok";
  excerpt: string;
  url: string;
  published_at: string;  // ISO date "YYYY-MM-DD"
  likes: number;
  is_active: boolean;
  order: number;
}

/** Charge les posts reseaux sociaux depuis le backend Django. */
export async function fetchSocialPosts(): Promise<SocialPost[]> {
  const res = await api.get<SocialPost[] | Paginated<SocialPost>>(
    "/community/social-posts/"
  );
  return unwrapList(res.data);
}
