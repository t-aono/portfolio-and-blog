import * as path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';

export default class PageData {
  private _config: string;

  constructor(private pagePath: string) {
    this.pagePath = pagePath;
    const configJsonPath = path.join(process.cwd(), 'content', 'data', 'config.json');
    this._config = JSON.parse(fs.readFileSync(configJsonPath, 'utf-8'));
  }

  getModelName = () => {
    if (this.pagePath === '/portfolio') return 'portfolio';
    else if (this.pagePath.match(/\/blog.*/)) return 'blog';
    else return 'advanced';
  };

  getMarkDownData = () => {
    let markdownFile = '';
    if (this.pagePath === '/') markdownFile = 'index.md';
    else if (this.pagePath === '/portfolio') markdownFile = 'portfolio/index.md';
    else if (this.pagePath.match(/\/blog.*/)) markdownFile = 'blog/index.md';

    const filePath = path.join(process.cwd(), 'content', 'pages', markdownFile);
    const markdownText = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(markdownText);

    return data;
  };

  getPageProps = async () => {
    return {
      page: {
        __metadata: { modelName: this.getModelName(), urlPath: this.pagePath },
        ...this.getMarkDownData()
      },
      data: {
        config: this._config
      },
      projects: [],
      posts: [],
      pages: [],
      categories: [],
      page_no: 0,
      post_count: 0
    };
  };
}
