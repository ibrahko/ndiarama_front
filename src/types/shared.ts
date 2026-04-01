export type AppRoute =
  | "home"
  | "media"
  | "services"
  | "community"
  | "contact";

export interface NavItem {
  key: AppRoute;
  label: string;
  shortLabel?: string;
  description?: string;
}