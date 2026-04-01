import React, { useState } from "react";
import { postContact, ContactPayload } from "../../api/communication";

const SUBJECTS = [
  "Demande de consulting",
  "Production audiovisuelle",
  "Formation & ateliers",
  "Partenariat",
  "Presse & médias",
  "Autre",
];

type Field = keyof ContactPayload;
type Errors = Partial<Record<Field, string>>;

export default function ContactForm() {
  const [form, setForm] = useState<ContactPayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Le nom est requis";
    if (!form.email.trim()) e.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Email invalide";
    if (!form.subject) e.subject = "Veuillez choisir un sujet";
    if (!form.message.trim()) e.message = "Le message est requis";
    else if (form.message.trim().length < 20)
      e.message = "Message trop court (20 caractères min.)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as Field]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError(null);
    try {
      await postContact(form);
      setSent(true);
    } catch (err) {
      setServerError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-[22px] border border-[#e3d4c8] bg-white p-8 text-center shadow-[0_8px_24px_rgba(120,78,52,0.05)]">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#d4dfcc] text-[#2e5c10] text-2xl mb-4 mx-auto">
          ✓
        </div>
        <h2 className="text-base font-semibold text-ndiarama-dark mb-2">
          Message envoyé !
        </h2>
        <p className="text-sm text-ndiarama-ink/70 max-w-sm mx-auto leading-relaxed">
          Merci pour ton message. L'équipe NDIARAMA te répondra dans les 48h ouvrées.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-ndiarama-text transition hover:opacity-75"
        >
          ← Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] border border-[#e3d4c8] bg-white p-6 md:p-7 shadow-[0_8px_24px_rgba(120,78,52,0.05)]">
      <h2 className="text-base font-semibold text-ndiarama-dark mb-1">
        Envoyer un message
      </h2>
      <p className="text-xs text-ndiarama-ink/60 mb-6">
        Tous les champs sont requis.
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

        {/* Name + Email */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-ndiarama-dark mb-1.5">
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ibrahima Koné"
              className={`w-full rounded-[10px] border px-4 py-2.5 text-xs text-ndiarama-dark placeholder:text-ndiarama-ink/35 focus:outline-none transition ${
                errors.name
                  ? "border-red-400 bg-red-50 focus:border-red-400"
                  : "border-[#e3d4c8] bg-white focus:border-ndiarama-text"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-[10px] text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-ndiarama-dark mb-1.5">
              Adresse email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ton@email.com"
              className={`w-full rounded-[10px] border px-4 py-2.5 text-xs text-ndiarama-dark placeholder:text-ndiarama-ink/35 focus:outline-none transition ${
                errors.email
                  ? "border-red-400 bg-red-50 focus:border-red-400"
                  : "border-[#e3d4c8] bg-white focus:border-ndiarama-text"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-[10px] text-red-500">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block text-xs font-medium text-ndiarama-dark mb-1.5">
            Sujet
          </label>
          <select
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className={`w-full rounded-[10px] border px-4 py-2.5 text-xs text-ndiarama-dark bg-white focus:outline-none transition appearance-none cursor-pointer ${
              errors.subject
                ? "border-red-400 bg-red-50 focus:border-red-400"
                : "border-[#e3d4c8] focus:border-ndiarama-text"
            }`}
          >
            <option value="">— Choisir un sujet —</option>
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-[10px] text-red-500">{errors.subject}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium text-ndiarama-dark mb-1.5">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            placeholder="Décris ton projet, ta demande ou ta question..."
            className={`w-full rounded-[10px] border px-4 py-2.5 text-xs text-ndiarama-dark placeholder:text-ndiarama-ink/35 focus:outline-none transition resize-none leading-5 ${
              errors.message
                ? "border-red-400 bg-red-50 focus:border-red-400"
                : "border-[#e3d4c8] bg-white focus:border-ndiarama-text"
            }`}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.message ? (
              <p className="text-[10px] text-red-500">{errors.message}</p>
            ) : (
              <span />
            )}
            <p className={`text-[10px] ${form.message.length < 20 ? "text-ndiarama-ink/40" : "text-[#2e5c10]"}`}>
              {form.message.length} / 20 min.
            </p>
          </div>
        </div>

        {/* Server error */}
        {serverError && (
          <p className="rounded-[8px] bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-600">
            {serverError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-ndiarama-text px-6 py-3 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Envoi en cours…
            </>
          ) : (
            "Envoyer le message →"
          )}
        </button>
      </form>
    </div>
  );
}