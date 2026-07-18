import axios from "axios";

/**
 * Client HTTP unique de l'application.
 * Tous les modules src/api/*.ts passent par cette instance :
 * une seule source de vérité pour l'URL de base et les en-têtes.
 */
const api = axios.create({
  baseURL: (import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default api;