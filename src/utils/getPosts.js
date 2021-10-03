const { Client } = require("@notionhq/client")

export default async function getPosts() {
  const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN });
  const databaseId = '75d817d15e21455f8df10c68aa28f7de';
  const response = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'date',
        direction: 'descending'
      }
    ]
  });
  return response.results.map(row => {
// console.log(row.properties.category.multi_select[0].name)
    return {
      pageId: row.id,
      title: row.properties.title.title[0].plain_text,
      category: row.properties.category.multi_select[0].name,
      // date: row.properties.date.date.start.replace(/\-/g, '/'),
      publish: row.properties.publish.checkbox,
      __metadata: {
        urlPath: `/blog/${row.id}`
      }
    }
  });
}