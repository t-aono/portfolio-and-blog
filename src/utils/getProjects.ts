import { Client as ClientType } from '@notionhq/client';
import { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';
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
  const response: QueryDatabaseResponse = await notion.databases.query(queryParam);

  return response.results;
}

export const makeProjectCollection = (projects): ProjectType[] => {
  return projects.map((row) => {
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
}

export default getProjects;