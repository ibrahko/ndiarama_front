import React, { useEffect, useState } from "react";
import { fetchShows, fetchEpisodes, MediaShow, MediaEpisode } from "../api/media";

import MediaHero from "../components/media/MediaHero";
import MediaShowList from "../components/media/MediaShowList";
import MediaEpisodeList from "../components/media/MediaEpisodeList";

export default function Media() {
  const [shows, setShows] = useState<MediaShow[]>([]);
  const [episodes, setEpisodes] = useState<MediaEpisode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchShows(), fetchEpisodes()])
      .then(([s, e]) => {
        setShows(s);
        setEpisodes(e);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement du média");
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
      <MediaHero />
      <MediaShowList shows={shows} />
      <MediaEpisodeList episodes={episodes} />
    </main>
  );
}