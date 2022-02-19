import * as fs from 'fs';
import matter from 'gray-matter';
import * as path from 'path';

export const getWorkList = () => {
  const directory = path.join(process.cwd(), 'content', 'pages', 'work');
  const files = fs.readdirSync(directory);
  // console.log(files);
  return files
    .filter((file) => file !== 'index.md')
    .map((file) => {
      const markdownText = fs.readFileSync(path.join(process.cwd(), 'content', 'pages', 'work', file));
      return matter(markdownText);
    });
};
