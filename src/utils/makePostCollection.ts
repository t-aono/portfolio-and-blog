import { PostType } from '../types/layouts';

export const makePostCollection = (posts): PostType[] => {
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

export default makePostCollection;
