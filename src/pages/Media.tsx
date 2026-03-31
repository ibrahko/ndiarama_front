import React, { useEffect, useState } from "react";
import { fetchShows, Show, Episode } from "../api/media";

const Media: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);

  useEffect(() => {
    fetchShows()
      .then((data) => {
        setShows(data);
        // premier épisode dispo par défaut
        const firstShow = data[0];
        if (firstShow && firstShow.episodes.length > 0) {
          setCurrentEpisode(firstShow.episodes[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des émissions");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement des émissions…</div>;
  if (error) return <div>{error}</div>;
  if (!shows.length) return <div>Aucune émission disponible pour le moment.</div>;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem" }}>
      <h1>Nos émissions</h1>

      {/* Player */}
      {currentEpisode && (
        <section style={{ marginBottom: "2rem" }}>
          <h2>
            {currentEpisode.show_title} — {currentEpisode.title}
          </h2>
          <p>{currentEpisode.description}</p>
          <p>
            <small>Durée : {currentEpisode.duration}</small>
          </p>

          {currentEpisode.media_type === "audio" ? (
            <audio
              src={currentEpisode.media_url}
              controls
              style={{ width: "100%" }}
            />
          ) : (
            <video
              src={currentEpisode.media_url}
              controls
              style={{ width: "100%", maxHeight: 480 }}
            />
          )}
        </section>
      )}

      {/* Liste des shows + épisodes */}
      <section>
        {shows.map((show) => (
          <article key={show.id} style={{ marginBottom: "1.5rem" }}>
            <h3>{show.title}</h3>
            <p>{show.tagline}</p>
            <ul>
              {show.episodes.map((ep) => (
                <li key={ep.id}>
                  <button
                    type="button"
                    onClick={() => setCurrentEpisode(ep)}
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      textDecoration:
                        currentEpisode?.id === ep.id ? "underline" : "none",
                      cursor: "pointer",
                    }}
                  >
                    {ep.title} {ep.duration && `(${ep.duration})`}
                  </button>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
};

export default Media;