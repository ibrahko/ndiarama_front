// tailwind.config.cjs
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Corps — Inter (chargé depuis Google Fonts dans index.css)
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        // Titres — DM Serif Display
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        // Mono — pour chrono AudioProgress
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        ndiarama: {
          light:  "#e9c1a4",
          medium: "#cc8a5f",
          dark:   "#b27a54",
          text:   "#c69470",
          ink:    "#444444",
        },
      },
    },
  },
  plugins: [],
};
