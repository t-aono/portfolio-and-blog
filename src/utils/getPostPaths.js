const { Client } = require("@notionhq/client")

export default async function getPostPaths() {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const databaseId = '75d817d15e21455f8df10c68aa28f7de';
  const response = await notion.databases.query({ database_id: databaseId });
  return response.results.map(row => {
    return `/blog/${row.id}`
  });
}