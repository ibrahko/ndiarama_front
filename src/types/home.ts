export type SiteSettings = {
    id?: number;
    site_name?: string;
    hero_slogan?: string;
    mission_text?: string;
    email?: string;
    phone?: string;
    address?: string;
    hero_video?: string;
    hero_video_url?: string;
  };
  
  export type Service = {
    id: number;
    title: string;
    short_description?: string;
    description?: string;
    category?: string;
  };
  
  export type Episode = {
    id: number;
    title?: string;
    description?: string;
    duration?: string;
  };
  
  export type Show = {
    id: number;
    title: string;
    tagline?: string;
    description?: string;
    episodes?: Episode[];
  };
  
  export type TeamMember = {
    id: number;
    name: string;
    role: string;
    short_bio?: string;
    photo?: string;
    image?: string;
  };
  
  export type Testimonial = {
    id: number;
    name: string;
    message: string;
    position?: string;
  };
  
  export type HomePayload = {
    settings: SiteSettings | null;
    services: Service[];
    shows: Show[];
    team: TeamMember[];
    testimonials: Testimonial[];
  };