import { Client as ClientType } from '@notionhq/client/build/src';
import { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints';

const { Client } = require('@notionhq/client');

export const getCategories = async () => {
  const notion: ClientType = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = process.env.NOTION_POSTS_DB_ID;
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

  return await notion.databases.query(queryParam);
};

type CategoryType = {
  results: {
    id: string;
    properties?: {
      category?: {
        multi_select: {
          name: string;
        }[];
      };
    };
  }[];
};

export const makeCategoryList = (responseCategories: CategoryType): string[] => {
  let categories: string[] = [];

  responseCategories.results.forEach((row) => {
    const multi_select = row.properties.category.multi_select;
    if (multi_select) {
      for (let cate of multi_select) {
        if (categories.includes(cate.name) === false) {
          categories.push(cate.name);
        }
      }
    }
  });

  return categories;
};
