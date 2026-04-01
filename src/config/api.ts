export const API_BASE =
  (import.meta as any)?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

export const homeEndpoints = {
  settings: [
    `${API_BASE}/api/core/settings/`,
    `${API_BASE}/api/core/site-settings/`,
    `${API_BASE}/api/settings/`,
    `${API_BASE}/api/site-settings/`,
  ],
  services: [
    `${API_BASE}/api/services/`,
    `${API_BASE}/api/services/services/`,
    `${API_BASE}/api/service/`,
  ],
  shows: [
    `${API_BASE}/api/mediaapp/shows/`,
    `${API_BASE}/api/media/shows/`,
    `${API_BASE}/api/shows/`,
  ],
  team: [
    `${API_BASE}/api/core/team-members/`,
    `${API_BASE}/api/core/team/`,
    `${API_BASE}/api/team-members/`,
  ],
  testimonials: [
    `${API_BASE}/api/core/testimonials/`,
    `${API_BASE}/api/testimonials/`,
  ],
};

export const mediaEndpoints = {
  shows: [
    `${API_BASE}/api/mediaapp/shows/`,
    `${API_BASE}/api/media/shows/`,
    `${API_BASE}/api/shows/`,
  ],
};

export const servicesEndpoints = {
  services: [
    `${API_BASE}/api/services/`,
    `${API_BASE}/api/services/services/`,
    `${API_BASE}/api/service/`,
  ],
};

export const communityEndpoints = {
  programs: [
    `${API_BASE}/api/community/programs/`,
    `${API_BASE}/api/programs/`,
    `${API_BASE}/api/opportunities/`,
  ],
  posts: [
    `${API_BASE}/api/community/posts/`,
    `${API_BASE}/api/posts/`,
    `${API_BASE}/api/social-posts/`,
  ],
  links: [
    `${API_BASE}/api/community/links/`,
    `${API_BASE}/api/community/social-links/`,
    `${API_BASE}/api/links/`,
  ],
  settings: [
    `${API_BASE}/api/core/settings/`,
    `${API_BASE}/api/core/site-settings/`,
    `${API_BASE}/api/settings/`,
  ],
};

export const contactEndpoints = {
  settings: [
    `${API_BASE}/api/core/settings/`,
    `${API_BASE}/api/core/site-settings/`,
    `${API_BASE}/api/settings/`,
  ],
};
