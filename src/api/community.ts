const BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

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
  const res = await fetch(`${BASE}/api/community/features/`);
  if (!res.ok) throw new Error("Erreur chargement features");
  const data: CommunityFeature[] = await res.json();
  return data.map((f) => ({ ...f, telegram_link: cleanUrl(f.telegram_link) }));
}

export async function fetchProgramHighlights(): Promise<ProgramHighlight[]> {
  const res = await fetch(`${BASE}/api/community/programs/`);
  if (!res.ok) throw new Error("Erreur chargement programmes");
  const data: ProgramHighlight[] = await res.json();
  return data.map((p) => ({ ...p, external_link: cleanUrl(p.external_link) }));
}