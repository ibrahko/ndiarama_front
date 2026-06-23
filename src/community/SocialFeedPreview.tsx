/**
 * Apercu des derniers posts LinkedIn et TikTok de NDIARAMA.
 * Charge les posts depuis le backend Django (/api/community/social-posts/).
 * Fallback sur des posts statiques en cas d'erreur reseau.
 * Ref CDC : "Apercu des derniers posts LinkedIn & TikTok".
 */
import React, { useEffect, useState } from "react";
import { fetchSocialPosts, SocialPost } from "../api/community";

const FALLBACK_POSTS: SocialPost[] = [
  { id: 1, platform: "linkedin", order: 0, is_active: true, likes: 142,
    excerpt: "NDIARAMA x Chevening — nous avons accompagne 3 nouveaux boursiers cette annee. La preuve que les opportunites existent quand on est bien prepare.",
    url: "https://linkedin.com/company/ndiarama", published_at: "2026-06-10" },
  { id: 2, platform: "linkedin", order: 1, is_active: true, likes: 98,
    excerpt: "DEL ACADEMY ouvre ses inscriptions pour la prochaine cohorte. Soft skills, prise de parole, leadership : rejoins les 200+ alumni.",
    url: "https://linkedin.com/company/ndiarama", published_at: "2026-06-05" },
  { id: 3, platform: "tiktok", order: 0, is_active: true, likes: 334,
    excerpt: "Comment postuler a YALI en 2026 ? On decrypte les 5 erreurs a eviter dans ta candidature. Episode complet sur DEL PODCAST.",
    url: "https://tiktok.com/@ndiarama", published_at: "2026-06-08" },
  { id: 4, platform: "tiktok", order: 1, is_active: true, likes: 512,
    excerpt: "Tu parles devant une camera mais tu ne sais pas ou mettre les mains ? Voici la methode que l'on enseigne en bootcamp NDIARAMA.",
    url: "https://tiktok.com/@ndiarama", published_at: "2026-06-03" },
];

const PLATFORM_META = {
  linkedin: { label: "LinkedIn", color: "#0077B5", profile: "https://linkedin.com/company/ndiarama" },
  tiktok:   { label: "TikTok",   color: "#010101", profile: "https://tiktok.com/@ndiarama" },
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long" });

function PostCard({ post }: { post: SocialPost }) {
  return (
    <li>
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-[16px] border border-[#e3d4c8] bg-white p-4
                   shadow-[0_4px_16px_rgba(120,78,52,0.04)] transition
                   hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(120,78,52,0.08)]"
      >
        <p className="text-xs leading-6 text-ndiarama-ink/85 line-clamp-3">{post.excerpt}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-[10px] text-ndiarama-ink/45">{fmtDate(post.published_at)}</span>
          {post.likes > 0 && (
            <span className="text-[10px] text-ndiarama-ink/45">{post.likes} j'aime</span>
          )}
        </div>
      </a>
    </li>
  );
}

function PlatformColumn({ platform, posts }: { platform: "linkedin" | "tiktok"; posts: SocialPost[] }) {
  const meta = PLATFORM_META[platform];
  if (posts.length === 0) return null;
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: meta.color }} aria-hidden="true" />
        <h3 className="text-sm font-semibold text-ndiarama-dark">{meta.label}</h3>
        <a href={meta.profile} target="_blank" rel="noopener noreferrer"
           className="ml-auto text-[10px] text-ndiarama-text hover:opacity-75 transition">
          Voir le profil
        </a>
      </div>
      <ul className="flex flex-col gap-3">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </ul>
    </div>
  );
}

export default function SocialFeedPreview() {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSocialPosts()
      .then((data) => setPosts(data.length > 0 ? data : FALLBACK_POSTS))
      .catch(() => setPosts(FALLBACK_POSTS))
      .finally(() => setLoading(false));
  }, []);

  const linkedin = posts.filter((p) => p.platform === "linkedin");
  const tiktok   = posts.filter((p) => p.platform === "tiktok");

  if (loading) return (
    <section className="px-4 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="h-32 rounded-[16px] bg-[#f8f4ef] animate-pulse" />
      </div>
    </section>
  );

  return (
    <section className="px-4 pb-16" aria-labelledby="social-feed-heading">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.28em] text-ndiarama-ink/55 mb-1">Sur les reseaux</p>
          <h2 id="social-feed-heading" className="text-xl font-semibold text-ndiarama-text">Derniers posts</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <PlatformColumn platform="linkedin" posts={linkedin} />
          <PlatformColumn platform="tiktok"   posts={tiktok} />
        </div>
      </div>
    </section>
  );
}
