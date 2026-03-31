import api from "./client";

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

export interface Show {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string | null;
  order: number;
  is_active: boolean;
  episodes: Episode[];
}

export async function fetchShows(): Promise<Show[]> {
  const res = await api.get<Show[]>("/media/shows/");
  return res.data;
}