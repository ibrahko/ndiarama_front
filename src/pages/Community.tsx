import React, { useEffect, useState } from "react";
import {
  fetchCommunityFeatures,
  fetchProgramHighlights,
  CommunityFeature,
  ProgramHighlight,
} from "../api/community";

import CommunityHero from "../components/community/CommunityHero";
import CommunityFeaturesList from "../components/community/CommunityFeaturesList";
import ProgramsList from "../components/community/ProgramsList";
import CommunityCTA from "../components/community/CommunityCTA";

export default function Community() {
  const [features, setFeatures] = useState<CommunityFeature[]>([]);
  const [programs, setPrograms] = useState<ProgramHighlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchCommunityFeatures(), fetchProgramHighlights()])
      .then(([f, p]) => {
        setFeatures(f.filter((x) => x.is_active));
        setPrograms(p.filter((x) => x.is_active));
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement de la communauté");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ndiarama-ink">
      Chargement…
    </div>
  );

  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-red-600">
      {error}
    </div>
  );

  return (
    <main className="bg-[#f8f4ef] text-ndiarama-ink">
      <CommunityHero />
      <CommunityFeaturesList features={features} />
      <ProgramsList programs={programs} />
      <CommunityCTA />
    </main>
  );
}