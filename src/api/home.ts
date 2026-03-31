import api from "./client";

export interface SiteSettings {
  site_name: string;
  hero_slogan: string | null;
  hero_video_url: string | null;
  mission_text: string | null;
  address: string | null;
  email: string | null;
  phone: string | null;
  linkedin_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  short_bio: string;
  photo: string | null;
  order: number;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  message: string;
  photo: string | null;
  order: number;
}

export interface Show {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string | null;
  order: number;
  is_active: boolean;
}

export interface Episode {
  id: number;
  show: number;
  show_slug: string;
  show_title: string;
  title: string;
  slug: string;
  description: string;
  media_type: "audio" | "video";
  media_url: string;
  duration: string;
  published_at: string;
  is_published: boolean;
  is_featured: boolean;
}

export interface Service {
  id: number;
  category: "consulting" | "program" | "training";
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
  is_highlighted: boolean;
}

export interface HomePayload {
  settings: SiteSettings | null;
  team: TeamMember[];
  testimonials: Testimonial[];
  shows: (Show & { episodes: Episode[] })[];
  featured_episodes: Episode[];
  highlighted_services: Service[];
}

export async function fetchHome(): Promise<HomePayload> {
  const res = await api.get<HomePayload>("/home/");
  return res.data;
}