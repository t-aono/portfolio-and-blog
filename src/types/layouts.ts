export type PageType = {
  page: {
    hide_title: string;
    title: string;
    sections: [];
    seo: {
      title: string;
      description: string;
      robots: string[];
      extra: string[];
    };
  }
}

export type ConfigType = {
  config: {
    title: string;
    color_scheme: string;
    accent_color: string;
    favicon: string;
    domain: string;
  }
}
