import React from "react";

const INFO_ITEMS = [
  {
    icon: "✉",
    label: "Email",
    value: "contact@ndiarama.com",
    href: "mailto:contact@ndiarama.com",
  },
  {
    icon: "💬",
    label: "Telegram",
    value: "@ndiarama",
    href: "https://t.me/ndiarama",
  },
  {
    icon: "📍",
    label: "Localisation",
    value: "Bamako, Mali — Dakar, Sénégal",
    href: null,
  },
  {
    icon: "⏱",
    label: "Délai de réponse",
    value: "48h ouvrées",
    href: null,
  },
];

export default function ContactInfo() {
  return (
    <div className="rounded-[22px] border border-[#e3d4c8] bg-white p-6 shadow-[0_8px_24px_rgba(120,78,52,0.05)]">
      <h3 className="text-sm font-semibold text-ndiarama-dark mb-4">
        Informations de contact
      </h3>
      <ul className="flex flex-col gap-4">
        {INFO_ITEMS.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            <span className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-[#f8f2ec] text-ndiarama-text text-xs">
              {item.icon}
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-wide text-ndiarama-ink/50 mb-0.5">
                {item.label}
              </p>
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-ndiarama-text transition hover:opacity-75"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-xs font-medium text-ndiarama-dark">
                  {item.value}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}