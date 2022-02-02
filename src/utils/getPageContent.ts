import { Client as ClientType } from '@notionhq/client/build/src';

const { Client } = require('@notionhq/client');

type ChildrenType = {
  results: {
    type?: string;
    block?: string;
  }[];
};

export default async function getPageContent(pageId: string) {
  const notion: ClientType = new Client({ auth: process.env.NOTION_TOKEN });
  const children = await notion.blocks.children.list({ block_id: pageId, page_size: 100 }); // max 100

  let content = [];
  (children as ChildrenType).results.map((block) => {
    content.push({ type: block.type, block: block });
  });
  return { content };
}
