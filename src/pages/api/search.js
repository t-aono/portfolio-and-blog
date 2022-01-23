const { Client } = require('@notionhq/client');

export default function handler(req, res) {
  let response = null;
  let posts = [];

  const searchPosts = async (req) => {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    const databaseId = '75d817d15e21455f8df10c68aa28f7de';

    if (req.body.category) {
      const queryParam = {
        database_id: databaseId,
        sorts: [
          {
            property: 'date',
            direction: 'descending'
          }
        ],
        filter: {
          and: [
            {
              property: 'publish',
              checkbox: {
                equals: true
              }
            },
            {
              property: 'category',
              multi_select: {
                contains: req.body.category
              }
            }
          ]
        }
      };

      if (req.body.count) queryParam.page_size = req.body.count + 1;

      const data = await notion.databases.query(queryParam);
      posts = data.results;
    }

    if (req.body.title) {
      const queryParam = {
        query: req.body.title
      };

      const data = await notion.search(queryParam);
      // ブログ以外もヒットするのでカテゴリ有無で絞る
      posts = data.results
        .filter((page) => page.properties.category && page.properties.publish.checkbox)
        .sort((a, b) => new Date(b.properties.date.date.start).getTime() - new Date(a.properties.date.date.start).getTime());
    }

    return posts.map((row) => {
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
        console.log(error);
        res.status(error.body.status).end();
      }
    })();
  }
}
