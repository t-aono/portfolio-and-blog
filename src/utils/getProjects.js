const { Client } = require("@notionhq/client")

export default async function fetchProjects() {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN });
  const databaseId = 'a4928a93d9c0447fa889c7d60c5124a7';
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map(row => {
    return {
      pageId: row.id,
      title: row.properties.title.title[0].plain_text,
      skill: row.properties.skill.multi_select.map(skill => skill.name),
      date: row.properties.date.date.start.replace(/\-/g, '/'),
      __metadata: {
        urlPath: `/portfolio/${row.id}`
      }
    }
  });
}