const BASE = "http://127.0.0.1:8000";

export interface MediaEpisode {
  id: number;
  show: number;
  show_slug: string;
  show_title: string;
  title: string;
  slug: string;
  description: string;
  media_type: "video" | "audio";
  media_url: string;
  duration: string;
  published_at: string;
  is_published: boolean;
  is_featured: boolean;
}

export interface MediaShow {
  id: number;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  image: string | null;
  order: number;
  is_active: boolean;
  episodes: MediaEpisode[];
}

export async function fetchShows(): Promise<MediaShow[]> {
  const res = await fetch(`${BASE}/api/media/shows/`);
  if (!res.ok) throw new Error("Erreur chargement émissions");
  return res.json();
}

export async function fetchEpisodes(): Promise<MediaEpisode[]> {
  const res = await fetch(`${BASE}/api/media/episodes/`);
  if (!res.ok) throw new Error("Erreur chargement épisodes");
  return res.json();
}

export async function fetchShowBySlug(slug: string): Promise<MediaShow> {
  const res = await fetch(`${BASE}/api/media/shows/${slug}/`);
  if (!res.ok) throw new Error("Émission introuvable");
  return res.json();
}