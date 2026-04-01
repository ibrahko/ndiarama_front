const BASE = "http://127.0.0.1:8000";

export type ServiceCategory = "consulting" | "program" | "formation";

export interface Service {
  id: number;
  category: ServiceCategory;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
  is_highlighted: boolean;
}

export const CATEGORY_LABELS: Record<ServiceCategory, string> = {
  consulting: "Consulting",
  program:    "Production",
  formation:  "Formation",
};

export const CATEGORY_ICONS: Record<ServiceCategory, string> = {
  consulting: "◆",
  program:    "▶",
  formation:  "▲",
};

export const CATEGORY_COLORS: Record<ServiceCategory, { bg: string; text: string; badge: string }> = {
  consulting: {
    bg:    "from-[#2a1b17] via-[#4b3027] to-[#8c543b]",
    text:  "text-white",
    badge: "bg-white/15 text-white",
  },
  program: {
    bg:    "from-[#1a2a2a] via-[#1f3d3d] to-[#2a5a5a]",
    text:  "text-white",
    badge: "bg-white/15 text-white",
  },
  formation: {
    bg:    "from-[#2a2318] via-[#4a3a20] to-[#7a5c2a]",
    text:  "text-white",
    badge: "bg-white/15 text-white",
  },
};

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(`${BASE}/api/services/`);
  if (!res.ok) throw new Error("Erreur chargement services");
  return res.json();
}