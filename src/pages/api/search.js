const { Client } = require('@notionhq/client');

export default function handler(req, res) {
  let response = null;

  const searchPosts = async (req) => {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const queryParam = {
      query: req.body.query
    };

    const pages = await notion.search(queryParam);

    // ブログ以外もヒットするのでカテゴリ有無で絞る
    const publishedPost = await pages.results.filter((page) => page.properties.category && page.properties.publish.checkbox);

    return publishedPost.map((row) => {
      const emoji = row.icon ? row.icon.emoji : '';
      return {
        pageId: row.id,
        title: row.properties.title.title[0].plain_text,
        category: row.properties.category.multi_select.map((cat) => cat.name),
        date: row.properties.date.date.start,
        emoji: emoji,
        __metadata: {
          urlPath: `/blog/post/${row.id}`
        }
      };
    });
  };

  if (req.method === 'POST') {
    (async () => {
      try {
        response = await searchPosts(req);
        res.status(200).json(JSON.stringify(response));
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    })();
  }
}
