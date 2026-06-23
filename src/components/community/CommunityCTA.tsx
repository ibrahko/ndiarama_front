import React, { useState } from "react";
import { postNewsletter } from "../../api/communication";

/** CTA newsletter de la page Community — connecte a l'API backend. */
export default function CommunityCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      await postNewsletter({ email, source: "community" });
      setSent(true);
      localStorage.setItem("ndiarama_newsletter", "true");
    } catch {
      setError("Cet email est deja inscrit ou une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 pb-16" aria-labelledby="community-cta-heading">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-9">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-2">
                Rester connecte
              </p>
              <h2
                id="community-cta-heading"
                className="text-xl sm:text-2xl font-semibold text-white max-w-md leading-snug"
              >
                Recois les opportunites, les contenus et les programmes NDIARAMA directement dans ta boite.
              </h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Pas de spam — uniquement ce qui compte vraiment pour toi.
              </p>
            </div>

            <div>
              {sent ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-[16px] border border-white/20 bg-white/10 px-5 py-5 text-center"
                >
                  <p className="text-2xl mb-2" aria-hidden="true">✓</p>
                  <p className="text-sm font-semibold text-white">Bienvenue dans la communaute !</p>
                  <p className="mt-1 text-xs text-white/70">Tu recevras bientot nos prochaines actualites.</p>
                </div>
              ) : (
                <div className="rounded-[16px] border border-white/10 bg-white/10 px-5 py-5 backdrop-blur-sm">
                  <p className="text-xs text-white/70 mb-3">Inscris-toi a la newsletter NDIARAMA</p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-2 sm:flex-row"
                    aria-label="Formulaire newsletter communaute"
                  >
                    <label htmlFor="community-cta-email" className="sr-only">
                      Adresse email
                    </label>
                    <input
                      id="community-cta-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      required
                      disabled={loading}
                      className="flex-1 min-w-0 rounded-lg border border-white/20
                                 bg-white/10 px-4 py-2.5 text-sm text-white
                                 placeholder:text-white/40 focus:outline-none
                                 focus:border-white/40 transition backdrop-blur-sm
                                 disabled:opacity-60"
                    />
                    <button
                      type="submit"
                      disabled={loading || !email}
                      className="shrink-0 rounded-lg bg-white px-5 py-2.5 text-xs
                                 font-semibold text-[#2b211d] transition hover:bg-[#f4ece6]
                                 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "..." : "S'inscrire"}
                    </button>
                  </form>

                  {error && (
                    <p role="alert" className="mt-2 text-[10px] text-red-300">
                      {error}
                    </p>
                  )}

                  <p className="mt-2 text-[10px] text-white/45">
                    En t'inscrivant, tu acceptes de recevoir nos communications.
                    Desabonnement possible a tout moment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
