export type AppRoute =
  | "home"
  | "media"
  | "services"
  | "community"
  | "contact"
  | "legal";

export interface NavItem {
  key: AppRoute;
  label: string;
  shortLabel?: string;
  description?: string;
}
