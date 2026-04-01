export type NavItem = {
    label: string;
    path: string;
    description?: string;
  };
  
  export type SocialLink = {
    label: string;
    url: string;
  };
  
  export type FooterLinkGroup = {
    title: string;
    links: NavItem[];
  };
  