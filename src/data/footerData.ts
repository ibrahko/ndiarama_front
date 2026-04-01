import type { FooterLinkGroup, SocialLink } from "../types/layout";

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Navigation",
    links: [
      { label: "Accueil", path: "/" },
      { label: "Media", path: "/media" },
      { label: "Services", path: "/services" },
      { label: "Community", path: "/community" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Raccourcis",
    links: [
      { label: "Newsletter", path: "/community" },
      { label: "Opportunités", path: "/community" },
      { label: "Nous écrire", path: "/contact" },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com",
  },
  {
    label: "TikTok",
    url: "https://www.tiktok.com",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com",
  },
  {
    label: "YouTube",
    url: "https://www.youtube.com",
  },
];
