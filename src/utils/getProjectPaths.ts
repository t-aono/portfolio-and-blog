import { Client as ClientType } from '@notionhq/client/build/src';

const { Client } = require('@notionhq/client');

export const getProjectPaths = async () => {
  const notion: ClientType = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = process.env.NOTION_PROJECTS_DB_ID;
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map((row) => {
    return `/portfolio/${row.id}`;
  });
};

export default getProjectPaths;
