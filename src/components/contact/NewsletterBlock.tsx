import React, { useState } from "react";
import { postNewsletter } from "../../api/communication";

export default function NewsletterBlock() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      await postNewsletter({ email, first_name: firstName, source: "contact" });
      setSent(true);
    } catch {
      setError("Erreur lors de l'inscription. Cet email est peut-être déjà inscrit.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-[22px] border border-[#e3d4c8] bg-white p-6 shadow-[0_8px_24px_rgba(120,78,52,0.05)]">
      <div className="flex items-start gap-3 mb-4">
        <div className="h-9 w-9 shrink-0 flex items-center justify-center rounded-xl bg-ndiarama-text/10 text-ndiarama-text text-sm">
          ✉
        </div>
        <div>
          <h3 className="text-sm font-semibold text-ndiarama-dark leading-snug">
            Newsletter NDIARAMA
          </h3>
          <p className="text-xs text-ndiarama-ink/60 mt-0.5">
            Reçois nos actualités, programmes et opportunités.
          </p>
        </div>
      </div>

      {sent ? (
        <div className="rounded-[10px] bg-[#d4dfcc] px-4 py-3 text-xs font-medium text-[#2e5c10]">
          ✓ Merci {firstName || ""} ! Tu es bien inscrit(e).
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Prénom (optionnel)"
            className="w-full rounded-[10px] border border-[#e3d4c8] bg-white px-4 py-2.5 text-xs text-ndiarama-dark placeholder:text-ndiarama-ink/35 focus:outline-none focus:border-ndiarama-text transition"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            required
            className="w-full rounded-[10px] border border-[#e3d4c8] bg-white px-4 py-2.5 text-xs text-ndiarama-dark placeholder:text-ndiarama-ink/35 focus:outline-none focus:border-ndiarama-text transition"
          />
          {error && (
            <p className="text-[10px] text-red-500 px-1">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !email}
            className="rounded-[10px] bg-ndiarama-text px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Inscription…" : "S'inscrire →"}
          </button>
          <p className="text-[10px] text-ndiarama-ink/40 text-center">
            Désabonnement possible à tout moment.
          </p>
        </form>
      )}
    </div>
  );
}