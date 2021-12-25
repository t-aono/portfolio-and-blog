const { Client } = require("@notionhq/client")

export default function handler(req, res) {
  let response = null;

  const searchPosts = async (req) => {
    const notion = new Client({ auth: process.env.NOTION_TOKEN });
    // const databaseId = '75d817d15e21455f8df10c68aa28f7de';
    const queryParam = {
      query: req.body.query
    };

    // if (startCursor) queryParam.start_cursor = startCursor;
    const posts = await notion.search(queryParam);

    console.log(posts);

    if (!posts.results) res.status(200).json(JSON.stringify(response));

    // ブログ以外もヒットするのでカテゴリ有無で絞る
    const publishedPost = posts.results.filter(post => post.properties.publish.checkbox && post.properties.category);

    return publishedPost.map(row => {
      const emoji = (row.icon) ? row.icon.emoji : '';
        return {
          pageId: row.id,
          title: row.properties.title.title[0].plain_text,
          category: row.properties.category.multi_select.map(cat => cat.name),
          date: row.properties.date.date.start,
          emoji: emoji,
          __metadata: {
            urlPath: `/blog/post/${row.id}`
          }
        };
    });    

  }  

  if (req.method === 'POST') {
    (async () => {
      try {
        response = await searchPosts(req);
        res.status(200).json(JSON.stringify(response));
      } catch (error) {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
        }
      }
    })();
  }

}