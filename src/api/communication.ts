// src/api/communication.ts

import api from "./client";

// ─── Types ────────────────────────────────────────────────

export interface NewsletterPayload {
  email: string;
  first_name?: string;  // utilisé par NewsletterBlock
  whatsapp?: string;    // utilisé par NewsletterPopup
  source?: string;      // "popup" | "footer" | "community"
  /** Honeypot anti-spam — doit rester vide (rempli uniquement par les bots). */
  website?: string;
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
  /** Honeypot anti-spam — doit rester vide (rempli uniquement par les bots). */
  website?: string;
}

// ─── Fonctions ────────────────────────────────────────────

export async function postNewsletter(
  data: NewsletterPayload
): Promise<NewsletterResponse> {
  const res = await api.post<NewsletterResponse>(
    "/communication/newsletter/",
    data
  );
  return res.data;
}

// Alias utilisé par NewsletterPopup.tsx
export const subscribeNewsletter = postNewsletter;

export async function postContact(data: ContactPayload): Promise<void> {
  await api.post("/communication/contact/", data);
}