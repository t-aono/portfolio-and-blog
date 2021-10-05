const { Client } = require("@notionhq/client")

export default async function getPageDetail(pageId) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const children = await notion.blocks.children.list({ block_id: pageId, page_size: 50 });
  let content = [];
  children.results.map(block => {
    content.push({ type: block.type, block: block });
  })
  return { content };
}