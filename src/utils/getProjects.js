const { Client } = require("@notionhq/client")

export default async function getProjects() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = 'a4928a93d9c0447fa889c7d60c5124a7';
  const queryParam = {
    database_id: databaseId,
    sorts: [
      {
        property: 'date',
        direction: 'descending'
      }
    ]
  };
  const response = await notion.databases.query(queryParam);
  return response.results.map(row => {
    return {
      pageId: row.id,
      title: row.properties.title.title[0].plain_text,
      skill: row.properties.skill.rich_text[0].plain_text,
      summary: row.properties.summary.rich_text[0].plain_text,
      date: row.properties.date.date.start,
      thumbnail: row.properties.thumbnail.rich_text[0].plain_text,
      __metadata: {
        urlPath: `/portfolio/project/${row.id}`
      }
    }
  });
}