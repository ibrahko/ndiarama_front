import React from "react";
import { CommunityFeature } from "../../api/community";
import CommunityFeatureCard from "./CommunityFeatureCard";

interface Props {
  features: CommunityFeature[];
}

export default function CommunityFeaturesList({ features }: Props) {
  if (features.length === 0) {
    return (
      <div className="text-center py-10 text-ndiarama-ink/60 text-sm">
        Les fonctionnalités communautaires arrivent bientôt.
      </div>
    );
  }

  return (
    <section id="features" className="px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-7">
          <p className="text-[11px] uppercase tracking-[0.26em] text-ndiarama-ink/55 mb-2">
            Ce que tu trouves ici
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold text-ndiarama-text">
            Pourquoi rejoindre la communauté
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, i) => (
            <CommunityFeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}