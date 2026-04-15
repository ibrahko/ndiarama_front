// src/api/communication.ts

const BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// ─── Types ────────────────────────────────────────────────

export interface NewsletterPayload {
  email: string;
  first_name?: string;  // utilisé par NewsletterBlock
  whatsapp?: string;    // utilisé par NewsletterPopup
  source?: string;      // "popup" | "footer" | "community"
}

export interface NewsletterResponse {
  success: boolean;
  message: string;
  mailchimp_synced?: boolean;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ─── Fonctions ────────────────────────────────────────────

export async function postNewsletter(
  data: NewsletterPayload
): Promise<NewsletterResponse> {
  const res = await fetch(`${BASE}/api/communication/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  return res.json();
}

// Alias utilisé par NewsletterPopup.tsx
export const subscribeNewsletter = postNewsletter;

export async function postContact(data: ContactPayload): Promise<void> {
  const res = await fetch(`${BASE}/api/communication/contact/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
}