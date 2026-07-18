/**
 * Déballe une réponse de liste DRF.
 * Avec la pagination activée côté backend, les listes arrivent sous la
 * forme { count, next, previous, results: [...] }. Ce helper accepte les
 * deux formats (tableau brut ou objet paginé) pour rester rétrocompatible.
 */
export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export function unwrapList<T>(data: T[] | Paginated<T>): T[] {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray((data as Paginated<T>).results)) {
    return (data as Paginated<T>).results;
  }
  return [];
}
