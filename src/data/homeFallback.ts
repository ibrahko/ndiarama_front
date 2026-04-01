import type { HomePayload } from "../types/home";

export const homeFallback: HomePayload = {
  settings: {
    site_name: "NDIARAMA",
    hero_slogan:
      "Une plateforme média et une agence de consulting pour inspirer, former et connecter les leaders de demain.",
    mission_text:
      "NDIARAMA MEDIA & CONSULTING accompagne les talents et les organisations à travers des contenus utiles, des formations ciblées et des opportunités à fort impact.",
    email: "contact@ndiarama.com",
    phone: "+223 00 00 00 00",
    address: "Bamako, Mali",
  },
  services: [
    {
      id: 1,
      title: "Consulting",
      short_description:
        "MC, animation, modération et organisation d’événements à forte portée.",
    },
    {
      id: 2,
      title: "Programmes",
      short_description:
        "DEL Academy et English Corner pour accompagner la progression des talents.",
    },
    {
      id: 3,
      title: "Formation",
      short_description:
        "Soft skills et tech skills pour développer des profils solides et prêts à l’impact.",
    },
  ],
  shows: [
    {
      id: 1,
      title: "ENGLISH CORNER",
      tagline: "Parler avec plus d’aisance et de clarté.",
      episodes: [
        {
          id: 11,
          description:
            "Des contenus pratiques pour progresser en anglais et mieux se préparer aux contextes internationaux.",
        },
      ],
    },
    {
      id: 2,
      title: "DEL PODCAST",
      tagline: "Des échanges sincères avec des profils inspirants.",
      episodes: [
        {
          id: 21,
          description:
            "Des conversations sur le leadership, la progression et les opportunités à fort impact.",
        },
      ],
    },
    {
      id: 3,
      title: "VOIX D'IMPACT",
      tagline: "Des récits et prises de parole utiles.",
      episodes: [
        {
          id: 31,
          description:
            "Une série éditoriale qui met en lumière des voix engagées et des parcours de transformation.",
        },
      ],
    },
  ],
  team: [
    {
      id: 1,
      name: "Équipe NDIARAMA",
      role: "Coordination & accompagnement",
      short_bio:
        "Une équipe mobilisée autour de la transmission, de l’excellence et de l’ouverture à l’international.",
    },
  ],
  testimonials: [
    {
      id: 1,
      name: "Client & partenaire",
      message:
        "NDIARAMA apporte une vraie clarté dans l’accompagnement et une qualité de contenu remarquable.",
      position: "Collaboration institutionnelle",
    },
  ],
};