import { Client as ClientType } from '@notionhq/client';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';
import { ProjectType } from '../types/layouts';

const { Client } = require('@notionhq/client');

export const getProjects = async () => {
  const notion: ClientType = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = 'a4928a93d9c0447fa889c7d60c5124a7';
  const queryParam: QueryDatabaseParameters = {
    database_id: databaseId,
    sorts: [
      {
        property: 'term',
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
  return await notion.databases.query(queryParam);
};

type responseProjects = {
  results: {
    id: string;
    properties?: {
      title?: {
        title: { plain_text }[];
      };
      skill?: {
        rich_text: { plain_text: string };
      };
      summary?: {
        rich_text: { plain_text: string };
      };
      term?: {
        rich_text: { plain_text: string };
      };
      thumbnail?: {
        rich_text: { plain_text: string };
      };
    };
  }[];
};

export const makeProjectCollection = (responseProjects: responseProjects): ProjectType[] => {
  return responseProjects.results.map((row) => {
    return {
      pageId: row.id,
      title: row.properties.title.title[0].plain_text,
      skill: row.properties.skill.rich_text[0].plain_text,
      summary: row.properties.summary.rich_text[0].plain_text,
      term: row.properties.term.rich_text[0].plain_text,
      thumbnail: row.properties.thumbnail.rich_text[0].plain_text,
      __metadata: {
        urlPath: `/portfolio/project/${row.id}`
      }
    };
  });
};
