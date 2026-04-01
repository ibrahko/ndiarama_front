import type { CommunityPagePayload } from "../types/pages";

export const communityFallback: CommunityPagePayload = {
  intro: {
    title: "Une communauté orientée progression et opportunités",
    text: "NDIARAMA met en relation les talents, les contenus utiles et les programmes à fort impact pour favoriser la progression, la préparation et l’ouverture à l’international.",
  },
  programs: [
    {
      id: 1,
      name: "Chevening",
      description:
        "Programme de bourse très compétitif pour les futurs leaders souhaitant poursuivre un master au Royaume-Uni.",
      url: "#",
    },
    {
      id: 2,
      name: "YALI",
      description:
        "Initiative de leadership pour les jeunes Africains autour de l’engagement, de l’entrepreneuriat et de l’impact.",
      url: "#",
    },
    {
      id: 3,
      name: "Fulbright",
      description:
        "Programme académique international de référence pour les études, la recherche et les échanges.",
      url: "#",
    },
    {
      id: 4,
      name: "SUSI",
      description:
        "Programme intensif axé sur le leadership, la citoyenneté et les échanges universitaires.",
      url: "#",
    },
  ],
  links: [
    {
      id: 1,
      label: "Rejoindre le groupe Telegram privé",
      url: "#",
    },
    {
      id: 2,
      label: "S'inscrire à la newsletter",
      url: "#newsletter",
    },
  ],
  posts: [
    {
      id: 1,
      platform: "LinkedIn",
      title: "Derniers conseils sur les candidatures et opportunités",
      url: "#",
    },
    {
      id: 2,
      platform: "TikTok",
      title: "Capsules courtes de motivation et astuces pratiques",
      url: "#",
    },
  ],
};
