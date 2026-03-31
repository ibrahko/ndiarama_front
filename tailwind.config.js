// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        ndiarama: {
          light:  "#e9c1a4", // grosse pierre claire
          medium: "#cc8a5f", // pierre centrale plus orangée
          dark:   "#b27a54", // pierre du bas / accent
          text:   "#c69470", // texte NDIARAMA
          ink:    "#444444", // "Media & Consulting"
        },
      },
    },
  },
  plugins: [],
};
