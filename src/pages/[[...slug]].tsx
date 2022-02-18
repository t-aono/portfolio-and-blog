import { GetStaticPaths, GetStaticProps } from 'next';
import _ from 'lodash';
import { ParsedUrlQuery } from 'querystring';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

import { getProjects, getPosts, getCategories, makePostCollection, makeProjectCollection, makeCategoryList } from '../utils';
import pageLayouts from '../layouts';

const getMarkdownData = (pageUrl) => {
  let markdownFile = '';
  switch (pageUrl) {
    case '/':
      markdownFile = 'index.md';
      break;
    case '/portfolio':
      markdownFile = 'portfolio.md';
      break;
    case '/blog':
      markdownFile = 'blog.md';
      break;
    case '/contact':
      markdownFile = 'contact.md';
      break;
  }
  const filePath = path.join(process.cwd(), 'content', 'pages', markdownFile);
  const pageMd = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(pageMd);
  return data;
};

const getConfig = () => {
  const configJsonPath = path.join(process.cwd(), 'content', 'data', 'config.json');
  const configJson = fs.readFileSync(configJsonPath, 'utf-8');
  return JSON.parse(configJson);
};

const getModelName = (pagePath) => {
  switch (pagePath) {
    case '/':
      return 'advanced';
    case '/portfolio':
      return 'portfolio';
    case '/blog':
      return 'blog';
    default:
      return 'page';
  }
};

const Page = (props) => {
  const modelName = _.get(props, 'page.__metadata.modelName');
  const PageLayout = pageLayouts[modelName];
  if (!PageLayout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return <PageLayout {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  console.log('Page [...slug].js getStaticPaths');
  const paths = ['/', '/portfolio', '/blog', '/contact'];
  //await sourcebitDataClient.getStaticPaths();
  // const postPaths = (await getPosts('path')) as string[];
  // const blogPagingPaths = postPaths.map((_, i) => (i % 12 === 0 ? `/blog/paginate/${i / 12 + 2}` : null)).filter((v) => v);
  // paths.push(...blogPagingPaths);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ params: ParsedUrlQuery }> = async ({ params }) => {
  console.log('Page [...slug].js getStaticProps, params: ', params);
  const pagePath = '/' + (params.slug ? (params.slug as string[]).join('/') : '');
  const props = {
    page: {
      __metadata: { modelName: getModelName(pagePath), urlPath: pagePath },
      ...getMarkdownData(pagePath)
    },
    data: {
      config: getConfig()
    }
  };

  if (params.slug && params.slug[0] === 'portfolio') {
    const responseProjects = await getProjects();
    props.projects = makeProjectCollection(responseProjects);
    return { props };
  }

  if (params.slug && params.slug[0] === 'blog') {
    if (params.slug[1] && params.slug[1] === 'paginate') {
      // ページネーション
      const current = parseInt(params.slug[2], 10);
      props.page_no = current;
      const postIds = (await getPosts('id')) as string[];
      props.post_count = postIds.length;
      const tmpPosts = await getPosts('post', postIds[(current - 1) * 12]);
      props.posts = makePostCollection(tmpPosts);
      props.page = props.pages.find((p) => p.title === 'Blog');
    } else {
      // １ページ目
      props.page_no = 1;
      const posts = await getPosts('post');
      props.posts = makePostCollection(posts);
    }
    const responseCategories = await getCategories();
    props.categories = makeCategoryList(responseCategories);
    return { props };
  }

  // トップページ
  const topProjects = await getProjects();
  const topPosts = await getPosts('post');
  props.projects = makeProjectCollection(topProjects);
  props.posts = makePostCollection(topPosts);
  return { props };
};

export default Page;
