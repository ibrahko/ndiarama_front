import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // History API fallback en dev : toutes les URLs renvoient index.html
  server: {
    historyApiFallback: true,
  },

  // Preview (npm run preview) — même comportement
  preview: {
    port: 4173,
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test/**', 'src/**/*.d.ts'],
    },
  },
})
