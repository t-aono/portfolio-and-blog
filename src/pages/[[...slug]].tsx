import { GetStaticPaths, GetStaticProps } from 'next';
import _ from 'lodash';
import { ParsedUrlQuery } from 'querystring';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

import { getProjects, getPosts, getCategories, makePostCollection, makeProjectCollection, makeCategoryList } from '../utils';
import pageLayouts from '../layouts';

const getPage = (page) => {
  const pageMdPath = path.join(process.cwd(), 'content', 'pages', `${page}.md`);
  // console.log(pageMdPath);
  const pageMd = fs.readFileSync(pageMdPath, 'utf-8');
  console.log(matter(pageMd));
  // return matter(pageMd);
  // return {
  //   page: matter(pageMd)
  // };
};

const getConfig = () => {
  const configJsonPath = path.join(process.cwd(), 'content', 'data', 'config.json');
  const configJson = fs.readFileSync(configJsonPath, 'utf-8');
  return JSON.parse(configJson);
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
  const paths = ['/']; //await sourcebitDataClient.getStaticPaths();
  // const postPaths = (await getPosts('path')) as string[];
  // const blogPagingPaths = postPaths.map((_, i) => (i % 12 === 0 ? `/blog/paginate/${i / 12 + 2}` : null)).filter((v) => v);
  // paths.push(...blogPagingPaths);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ params: ParsedUrlQuery }> = async ({ params }) => {
  console.log('Page [...slug].js getStaticProps, params: ', params);
  const pagePath = '/' + (params.slug ? (params.slug as string[]).join('/') : '');
  const page = getPage('index');
  const props = {
    page: { __metadata: { modelName: 'advanced' }, ...page },
    data: {
      config: getConfig()
    }
  };
  //await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);

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

// export default withRemoteDataUpdates(Page);
export default Page;
