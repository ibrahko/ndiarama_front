import type { MediaPagePayload } from "../types/pages";

export const mediaFallback: MediaPagePayload = {
  shows: [
    {
      id: 1,
      title: "ENGLISH CORNER",
      tagline: "Mieux parler, mieux comprendre, mieux évoluer.",
      description:
        "Des capsules et formats pratiques pour renforcer l’aisance orale, la compréhension et la confiance en anglais.",
      episodes: [
        {
          id: 11,
          title: "Prendre la parole avec plus d’aisance",
          description:
            "Un épisode orienté expression, clarté et confiance dans les contextes académiques et professionnels.",
          duration: "12 min",
        },
      ],
    },
    {
      id: 2,
      title: "DEL PODCAST",
      tagline: "Des échanges sincères avec des profils inspirants.",
      description:
        "Des conversations autour du leadership, du parcours, de la progression et des opportunités à fort impact.",
      episodes: [
        {
          id: 21,
          title: "Leadership & opportunités",
          description:
            "Une discussion sur les trajectoires ambitieuses, la vision et la préparation aux programmes internationaux.",
          duration: "24 min",
        },
      ],
    },
    {
      id: 3,
      title: "VOIX D'IMPACT",
      tagline: "Des récits engagés et des prises de parole utiles.",
      description:
        "Une série éditoriale centrée sur les voix qui transmettent, éclairent et mobilisent.",
      episodes: [
        {
          id: 31,
          title: "Récits de transformation",
          description:
            "Des histoires concrètes de progression personnelle, professionnelle et communautaire.",
          duration: "18 min",
        },
      ],
    },
    {
      id: 4,
      title: "LADILY",
      tagline: "Une parole féminine ambitieuse et affirmée.",
      description:
        "Des contenus qui valorisent les trajectoires féminines, l’ambition, le leadership et l’expression.",
      episodes: [
        {
          id: 41,
          title: "Femmes, ambition et visibilité",
          description:
            "Un format autour du positionnement, de la voix et de la place des femmes dans les espaces d’influence.",
          duration: "16 min",
        },
      ],
    },
  ],
};
