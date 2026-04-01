import type { ServicesPagePayload } from "../types/pages";

export const servicesFallback: ServicesPagePayload = {
  categories: [
    {
      id: "consulting",
      title: "Consulting",
      intro:
        "Une parole professionnelle et structurée pour vos événements, panels et formats éditoriaux.",
      items: [
        {
          id: 1,
          title: "MC conférences, panels et émissions",
          short_description:
            "Prise en main fluide, professionnelle et engageante de vos temps forts.",
          category: "Consulting",
        },
        {
          id: 2,
          title: "Animation & modération",
          short_description:
            "Animation d’échanges, facilitation et cadrage des interventions.",
          category: "Consulting",
        },
        {
          id: 3,
          title: "Organisation d’événements",
          short_description:
            "Accompagnement sur la structuration éditoriale et l’expérience globale.",
          category: "Consulting",
        },
      ],
    },
    {
      id: "programmes",
      title: "Programmes",
      intro:
        "Des programmes conçus pour accompagner la progression linguistique, académique et personnelle.",
      items: [
        {
          id: 4,
          title: "DEL Academy",
          short_description:
            "Un cadre d’apprentissage structuré pour renforcer posture, méthodes et ambition.",
          category: "Programmes",
        },
        {
          id: 5,
          title: "English Corner",
          short_description:
            "Un espace de progression pratique pour développer l’aisance en anglais.",
          category: "Programmes",
        },
      ],
    },
    {
      id: "formation",
      title: "Formation",
      intro:
        "Des formats ciblés pour développer les compétences comportementales et techniques les plus utiles.",
      items: [
        {
          id: 6,
          title: "Soft skills",
          short_description:
            "Communication, prise de parole, négociation, time management et posture professionnelle.",
          category: "Formation",
        },
        {
          id: 7,
          title: "Tech skills",
          short_description:
            "Design, web development, outils digitaux et IA appliquée.",
          category: "Formation",
        },
      ],
    },
  ],
};
