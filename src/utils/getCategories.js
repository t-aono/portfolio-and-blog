const { Client } = require('@notionhq/client');

export default async function getCategories() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = '75d817d15e21455f8df10c68aa28f7de';
  const queryParam = {
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
  const response = await notion.databases.query(queryParam);

  let categories = [];
  response.results.forEach((row) => {
    const multi_select = row.properties.category.multi_select;
    if (multi_select) {
      for (let cate of multi_select) {
        if (categories.includes(cate.name) === false && cate.name !== 'other') {
          categories.push(cate.name);
        }
      }
    }
  });

  return categories;
}
