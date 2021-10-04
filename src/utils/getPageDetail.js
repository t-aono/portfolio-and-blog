const { Client } = require("@notionhq/client")

export default async function getPageDetail(pageId) {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  // const pageObject = await notion.pages.retrieve({ page_id: pageId });
  // const title = pageObject.properties.title.title[0].plain_text;

  const children = await notion.blocks.children.list({ block_id: pageId, page_size: 50 });
// console.log(children.results)
  let content = [];
  children.results.map(block => {
    // const image = (res.type === 'image') ? res.image.file.url : '';
    // const text = (res.type === 'paragraph' && res.paragraph.text.length > 0) ? res.paragraph.text[0].text.content : '';
    // if (image || text) content.push({ image, text });
    content.push({ type: block.type, block: block });
  })
  return { content };
}