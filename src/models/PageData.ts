import * as path from 'path';
import * as fs from 'fs';
import matter from 'gray-matter';
// import Work from './Work';
// import Post from './Post';
// import Link from './Link';

export default class PageData {
  private _config: string;

  constructor(private pagePath: string) {
    this.pagePath = pagePath;
    const configJsonPath = path.join(process.cwd(), 'content', 'data', 'config.json');
    this._config = JSON.parse(fs.readFileSync(configJsonPath, 'utf-8'));
  }

  getModelName = () => {
    if (this.pagePath === '/works') return 'works';
    else if (this.pagePath === '/about') return 'about';
    else if (this.pagePath.match(/\/blog.*/)) return 'blog';
    else return 'advanced';
  };

  getMarkDownData = () => {
    let markdownFile = '';
    if (this.pagePath === '/') markdownFile = 'index.md';
    else if (this.pagePath === '/works') markdownFile = 'works/index.md';
    else if (this.pagePath === '/about') markdownFile = 'about.md';
    else if (this.pagePath === '/contact') markdownFile = 'contact.md';
    else if (this.pagePath.match(/\/blog.*/)) markdownFile = 'blog/index.md';

    const filePath = path.join(process.cwd(), 'content', 'pages', markdownFile);
    const markdownText = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(markdownText);

    if (this.pagePath === '/about') {
      const content = this.getIndexContent();
      data.sections[0] = {
        ...data.sections[0],
        image: content.image,
        content_top: content.content_top,
        github_id: content.github_id
      };
    }

    return data;
  };

  setWorks = async () => {
    if (['/', '/works'].includes(this.pagePath)) {
      // return new Work().getAllWorks();
    }
    return [];
  };

  setPosts = async () => {
    if (['/blog'].includes(this.pagePath)) {
      // return new Post().getAllPostTitles();
    }
    return [];
  };

  setLinks = async () => {
    if (['/', '/about'].includes(this.pagePath)) {
      // return new Link().getTopPageLinks();
    } else if (this.pagePath === '/blog') {
      // return new Link().getBLogLinks();
    }
    return [];
  };

  getIndexContent = () => {
    const filePath = path.join(process.cwd(), 'content', 'pages', 'index.md');
    const markdownText = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(markdownText);
    if (this.pagePath === '/about') {
      const sections = data.sections.filter((section) => section.section_id === 'about');
      if (sections.length > 0) {
        return sections[0];
      }
    }
    return null;
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
