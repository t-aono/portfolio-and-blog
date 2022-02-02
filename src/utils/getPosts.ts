import { Client as ClientType } from '@notionhq/client';
import { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
import { PostType } from '../types/layouts';

const { Client } = require('@notionhq/client');

type KindType = 'post' | 'path' | 'id';
type ResponseType = Promise<(string | { object: 'page'; id: string })[]>;

export const getPosts = async (kind: KindType, startCursor: string = null): ResponseType => {
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

  let response: QueryDatabaseResponse = null;
  try {
    response = await notion.databases.query(queryParam);
  } catch (error) {
    return null;
  }

  return response.results.map((row) => {
    if (kind === 'path') {
      return `/blog/${row.id}`;
    } else if (kind === 'id') {
      return row.id;
    } else if (kind === 'post') {
      return row;
    } else {
      return null;
    }
  });
};

export const makePostCollection = (posts): PostType[] => {
  return posts.map((row) => {
    const emoji = row.icon ? row.icon.emoji : '';
    return {
      pageId: row.id,
      title: row.properties.title.title[0].plain_text,
      category: row.properties.category.multi_select.map((cat) => cat.name),
      date: row.properties.date.date.start,
      emoji: emoji,
      __metadata: {
        urlPath: `/blog/post/${row.id}`
      }
    };
  });
};

export default getPosts;
