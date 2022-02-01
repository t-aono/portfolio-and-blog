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
    checkbox?: { equals: boolean }
  };
  page_size?: number;
  start_cursor?: number;
};