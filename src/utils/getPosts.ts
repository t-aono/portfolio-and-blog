import { Client as ClientType } from '@notionhq/client';
import { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { PostType } from '../types/layouts';

const { Client } = require('@notionhq/client');

type KindType = 'post' | 'path' | 'id';
type ResponseType = Promise<string[] | QueryDatabaseResponse | null>;

export const getPosts = async (kind: KindType, startCursor: string = null) => {
  const notion: ClientType = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = '75d817d15e21455f8df10c68aa28f7de';
  const queryParam: QueryDatabaseParameters = {
    database_id: databaseId,
    sorts: [
      {
        property: 'date',
        direction: 'descending'
      }
    ],
    filter: {
      property: 'publish',
      checkbox: {
        equals: true
      }
    }
  };
  if (kind === 'post') queryParam.page_size = 12;
  if (startCursor) queryParam.start_cursor = startCursor;

  let response = null;
  try {
    response = await notion.databases.query(queryParam);
  } catch (error) {
    return null;
  }

  if (kind === 'path') {
    return response.results.map((row) => `/blog/${row.id}`);
  }
  if (kind === 'id') {
    return response.results.map((row) => row.id);
  }
  if (kind === 'post') {
    return response;
  }
  return null;
};

type ResponsePosts = {
  results: {
    id: string;
    icon?: {
      emoji: string;
    };
    properties?: {
      title?: {
        title: { plain_text: string };
      };
      category?: {
        multi_select: { name: string }[];
      };
      date?: {
        date: { start: string };
      };
    };
  }[];
};

export const makePostCollection = (responsePosts: ResponsePosts): PostType[] => {
  return responsePosts.results.map((row) => {
    return {
      pageId: row.id,
      title: row.properties.title.title[0].plain_text,
      category: row.properties.category.multi_select.map((cat) => cat.name),
      date: row.properties.date.date.start,
      emoji: row.icon ? row.icon.emoji : '',
      __metadata: {
        urlPath: `/blog/post/${row.id}`
      }
    };
  });
};
