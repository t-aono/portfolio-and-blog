const { Client } = require("@notionhq/client")

export default async function getProjectPaths() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = 'a4928a93d9c0447fa889c7d60c5124a7';
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map(row => {
    return `/portfolio/${row.id}`
  });
}