import { ContentType, PostType, ProjectType } from './layouts';

export type QueryParamType = {
  database_id: string;
  sorts: {
    property: string;
    direction: string;
  }[];
  filter: {
    and?: [
      {
        property: string;
        checkbox: {
          equals: boolean;
        };
      },
      {
        property: string;
        multi_select: {
          contains: string;
        };
      }
    ];
    property?: string;
    checkbox?: { equals: boolean };
  };
  page_size?: number;
  start_cursor?: number;
};

export type ConfigType = {
  data: { config: {} };
  page?: {
    __metadata: { modelName: string; urlPath: string };
    seo: { title: string; description: string };
  };
  post?: PostType | {};
  project?: ProjectType | {};
  content?: ContentType[];
  heading?: PageHeading[];
};

export type PageHeading = {
  content?: string;
  child?: {
    content: string;
  };
};

export type PagePropsType = {
  posts: PostType[];
  projects: ProjectType[];
  'page.__metadata.modelName': string;
};
