const BASE = "http://127.0.0.1:8000";

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterPayload {
  email: string;
  first_name?: string;
  source?: string;
}

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

export async function postNewsletter(data: NewsletterPayload): Promise<void> {
  const res = await fetch(`${BASE}/api/communication/newsletter/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
}