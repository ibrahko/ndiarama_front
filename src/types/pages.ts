export type MediaEpisode = {
    id: number;
    title?: string;
    description?: string;
    duration?: string;
    cover?: string;
    video_url?: string;
    audio_url?: string;
  };
  
  export type MediaShow = {
    id: number;
    title: string;
    tagline?: string;
    description?: string;
    image?: string;
    episodes?: MediaEpisode[];
  };
  
  export type MediaPagePayload = {
    shows: MediaShow[];
  };
  
  export type ServiceItem = {
    id: number;
    title: string;
    short_description?: string;
    description?: string;
    category?: string;
  };
  
  export type ServiceCategory = {
    id: string;
    title: string;
    intro: string;
    items: ServiceItem[];
  };
  
  export type ServicesPagePayload = {
    categories: ServiceCategory[];
  };
  
  export type OpportunityProgram = {
    id: number;
    name: string;
    description: string;
    url?: string;
  };
  
  export type SocialPost = {
    id: number;
    platform: "LinkedIn" | "TikTok";
    title: string;
    url?: string;
  };
  
  export type CommunityLink = {
    id: number;
    label: string;
    url: string;
  };
  
  export type CommunityPagePayload = {
    intro: {
      title: string;
      text: string;
    };
    programs: OpportunityProgram[];
    links: CommunityLink[];
    posts: SocialPost[];
  };
  
  export type ContactInfo = {
    email?: string;
    phone?: string;
    address?: string;
    map_url?: string;
  };
  
  export type ContactPagePayload = {
    intro: {
      title: string;
      text: string;
    };
    contact: ContactInfo;
  };
  