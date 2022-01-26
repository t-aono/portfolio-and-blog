export type AttrsType = {
  target?: string;
  rel?: string;
} 

export type ActionType = {
  action: {
    url: string;
    label: string;
    style: string;
    icon: string;
    classes: string[];
  };
}


export interface PageType {
  page: string;
}

type PickType<T, K extends keyof T> = T[K];

export interface ConfigType {
  config: {
    header: {
      logo: string;
      logoAlt: string;
      title: string;
      hasNav: boolean;
      navLinks: string[]
    },
    footer: {
      copyright: string;
      links: PickType<ActionType, 'action'>[];
      hasSocial: boolean;
      socialLinks: string[]
    }
  }
}