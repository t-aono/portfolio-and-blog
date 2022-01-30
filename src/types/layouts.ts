export type PageType = {
  hide_title: string;
  title: string;
  subtitle: string;
  layout_style: string;
  col_number: string;
  sections: [];
  seo: {
    title: string;
    description: string;
    robots: string[];
    extra: string[];
  };
};

export type ConfigType = {
  title: string;
  color_scheme: string;
  accent_color: string;
  favicon: string;
  domain: string;
};

export type ContentType = {
  type: string;
  block: {
    id: string;
    heading_2: { text: { text: { content: string } }[] };
    heading_3: { text: { text: { content: string } }[] };
    paragraph: {
      text: {
        href: string;
        plain_text: string;
      }[];
    };
    code: {
      language: string;
      text: { text: { content } }[];
    };
    image: { file: { url: string } };
    bulleted_list_item: { text: { plain_text: string }[] };
    numbered_list_item: { text: { plain_text: string }[] };
  };
};

export type ProjectType = {
  pageId: string;
  thumbnail: string;
  title: string;
  skill: string[];
  term: string;
};

export type PostType = {
  title: string;
  category: string[];
  emoji: string;
  date?: string;
  pageId: string;
};