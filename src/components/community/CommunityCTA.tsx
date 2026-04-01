import React, { useState } from "react";

export default function CommunityCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  };

  return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-[28px] bg-gradient-to-r from-[#2a1b17] via-[#4b3027] to-[#8c543b] px-7 py-8 md:px-10 md:py-9">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">

            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-white/60 mb-2">
                Rester connecté
              </p>
              <h2 className="text-xl sm:text-2xl font-semibold text-white max-w-md leading-snug">
                Reçois les opportunités, les contenus et les programmes NDIARAMA directement dans ta boîte.
              </h2>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                Pas de spam — uniquement ce qui compte vraiment pour toi.
              </p>
            </div>

            <div>
              {sent ? (
                <div className="rounded-[16px] border border-white/20 bg-white/10 px-5 py-5 text-center">
                  <p className="text-2xl mb-2">✓</p>
                  <p className="text-sm font-semibold text-white">Bienvenue dans la communauté !</p>
                  <p className="mt-1 text-xs text-white/70">Tu recevras bientôt nos prochaines actualités.</p>
                </div>
              ) : (
                <div className="rounded-[16px] border border-white/12 bg-white/10 px-5 py-5 backdrop-blur-sm">
                  <p className="text-xs text-white/70 mb-3">
                    Inscris-toi à la newsletter NDIARAMA
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ton@email.com"
                      required
                      className="flex-1 min-w-0 rounded-[10px] border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition backdrop-blur-sm"
                    />
                    <button
                      type="submit"
                      className="shrink-0 rounded-[10px] bg-white px-5 py-2.5 text-xs font-semibold text-[#2b211d] transition hover:bg-[#f4ece6]"
                    >
                      S'inscrire
                    </button>
                  </form>
                  <p className="mt-2 text-[10px] text-white/45">
                    En t'inscrivant, tu acceptes de recevoir nos communications. Désabonnement possible à tout moment.
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