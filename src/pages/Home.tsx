import React, { useEffect, useState } from "react";
import { fetchHome, HomePayload } from "../api/home";

import HomeHero from "../components/home/HomeHero";
import HomeServices from "../components/home/HomeServices";
import HomeFeaturedEpisodes from "../components/home/HomeFeaturedEpisodes";
import HomeTestimonials from "../components/home/HomeTestimonials";
import HomeTeam from "../components/home/HomeTeam";
import HomeCommunity from "../components/home/HomeCommunity";

export default function Home() {
  const [data, setData] = useState<HomePayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHome()
      .then((payload) => { setData(payload); setLoading(false); })
      .catch((err) => { console.error(err); setError("Erreur lors du chargement"); setLoading(false); });
  }, []);

  if (loading) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ndiarama-ink">Chargement…</div>
  );
  if (error) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-red-600">{error}</div>
  );
  if (!data) return (
    <div className="max-w-6xl mx-auto px-4 py-16 text-center text-ndiarama-ink">Aucune donnée</div>
  );

  const { settings, team, testimonials, shows, featured_episodes, highlighted_services } = data;

  return (
    <main className="bg-[#f8f4ef] text-ndiarama-ink">
      <HomeHero settings={settings} />
      <HomeServices shows={shows} highlighted_services={highlighted_services} />
      <HomeFeaturedEpisodes featured_episodes={featured_episodes} />
      <HomeTestimonials testimonials={testimonials} />
      <HomeTeam team={team} />
      <HomeCommunity settings={settings} />
    </main>
  );
}