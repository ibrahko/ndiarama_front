import React, { useState } from "react";
import { CommunityFeature } from "../../api/community";

const ICONS = ["✦", "▶", "◆", "●"];

interface Props {
  feature: CommunityFeature;
  index: number;
}

export default function CommunityFeatureCard({ feature, index }: Props) {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const icon = ICONS[index % ICONS.length];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setShowForm(false);
  };

  return (
    <article className="rounded-[22px] border border-[#e3d4c8] bg-white overflow-hidden shadow-[0_8px_24px_rgba(120,78,52,0.05)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_35px_rgba(120,78,52,0.09)]">

      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-[#f8f2ec] to-[#f0e4d8] px-5 pt-5 pb-4 border-b border-[#eaddd5]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ndiarama-text/10 text-ndiarama-text text-base shrink-0">
            {icon}
          </div>
          <span className="inline-flex rounded-full bg-ndiarama-text/10 px-2.5 py-0.5 text-[10px] font-medium text-ndiarama-text">
            #{index + 1}
          </span>
        </div>
        <h2 className="mt-3 text-sm font-semibold text-ndiarama-dark leading-snug">
          {feature.title}
        </h2>
      </div>

      {/* ── Description ── */}
      <div className="px-5 py-4">
        <p className="text-xs leading-5 text-ndiarama-ink/80">
          {feature.description}
        </p>
      </div>

      {/* ── Actions ── */}
      <div className="px-5 pb-5 flex flex-col gap-2">

        {/* Bouton Telegram */}
        {feature.telegram_link && (
          <a
            href={feature.telegram_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#229ED9] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#1a8fc4]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.915l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.644z" />
            </svg>
            Rejoindre sur Telegram
          </a>
        )}

        {/* Bouton Newsletter */}
        {feature.show_newsletter_button && !subscribed && (
          <>
            {!showForm ? (
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#e3d4c8] bg-[#faf6f2] px-4 py-2.5 text-xs font-semibold text-ndiarama-text transition hover:bg-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                S'inscrire à la newsletter
              </button>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="flex-1 min-w-0 rounded-[8px] border border-[#e3d4c8] bg-white px-3 py-2 text-xs text-ndiarama-dark placeholder:text-ndiarama-ink/40 focus:outline-none focus:border-ndiarama-text transition"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-[8px] bg-ndiarama-text px-3 py-2 text-xs font-semibold text-white transition hover:opacity-90"
                >
                  OK
                </button>
              </form>
            )}
          </>
        )}

        {/* Confirmation inscription */}
        {subscribed && (
          <div className="inline-flex items-center gap-2 rounded-[10px] bg-[#d4dfcc] px-4 py-2.5 text-xs font-medium text-[#2e5c10]">
            <span>✓</span>
            <span>Inscrit avec succès !</span>
          </div>
        )}
      </div>
    </article>
  );
}