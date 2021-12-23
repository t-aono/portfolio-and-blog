const { Client } = require("@notionhq/client")

export default async function getPosts(type, startCursor = null) {
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
  if (type === 'post') queryParam.page_size = 12;
  if (startCursor) queryParam.start_cursor = startCursor;
  const response = await notion.databases.query(queryParam);

  return response.results.map(row => {
    if (type === 'path') {
      return `/blog/${row.id}`
    } else if (type === 'id') {
      return row.id
    } else if (type === 'post') {
      const emoji = (row.icon) ? row.icon.emoji : '';
      return {
        pageId: row.id,
        title: row.properties.title.title[0].plain_text,
        category: row.properties.category.multi_select.map(cat => cat.name),
        date: row.properties.date.date.start,
        emoji: emoji,
        __metadata: {
          urlPath: `/blog/post/${row.id}`
        }
      };
    } else {
      return null
    }
  });
}