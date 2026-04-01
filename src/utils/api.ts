import { API_BASE } from "../config/api";

export async function fetchFromCandidates<T>(urls: string[], fallback: T): Promise<T> {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;

      const data = await response.json();

      if (Array.isArray(data)) return data as T;
      if (data?.results && Array.isArray(data.results)) return data.results as T;
      if (data?.data) return data.data as T;

      return data as T;
    } catch {
      continue;
    }
  }

  return fallback;
}

export function normalizeMediaUrl(value?: string | null): string | undefined {
  if (!value) return undefined;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) return `${API_BASE}${value}`;
  return `${API_BASE}/${value}`;
}