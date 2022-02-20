import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';

export const getWorkList = async () => {
  const directory = path.join(process.cwd(), 'content', 'pages', 'work');
  const files = fs.readdirSync(directory);
  // console.log(files);
  return files
    .filter((file) => file !== 'index.md' && file !== '.DS_Store')
    .map((file) => {
      console.log(file);
      const markdownText = fs.readFileSync(path.join(process.cwd(), 'content', 'pages', 'work', file));
      const { data, content } = matter(markdownText);
      return { data, content };
    });
};
