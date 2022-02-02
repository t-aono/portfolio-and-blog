import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getProjects, getPosts, getCategories, makePostCollection, makeProjectCollection } from '../utils';

import pageLayouts from '../layouts';

const Page = (props) => {
  const modelName = _.get(props, 'page.__metadata.modelName');
  const PageLayout = pageLayouts[modelName];
  if (!PageLayout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return <PageLayout {...props} />;
};

export async function getStaticPaths() {
  console.log('Page [...slug].js getStaticPaths');
  const paths = await sourcebitDataClient.getStaticPaths();
  const postPaths = await getPosts('path');
  const blogPagingPaths = postPaths.map((p, i) => (i % 12 === 0 ? `/blog/paginate/${i / 12 + 2}` : null)).filter((v) => v);
  paths.push(...blogPagingPaths);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log('Page [...slug].js getStaticProps, params: ', params);
  const pagePath = '/' + (params.slug ? params.slug.join('/') : '');
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);

  if (params.slug && params.slug[0] === 'portfolio') {
    const projects = await getProjects();
    props.projects = makeProjectCollection(projects);
    return { props };
  }

  if (params.slug && params.slug[0] === 'blog') {
    if (params.slug[1] && params.slug[1] === 'paginate') {
      // ページネーション
      const current = parseInt(params.slug[2], 10);
      props.page_no = current;
      const postIds = await getPosts('id');
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
    props.categories = await getCategories();
    return { props };
  }

  // トップページ
  const topProjects = await getProjects();
  const topPosts = await getPosts('post');
  props.projects = makeProjectCollection(topProjects);
  props.posts = makePostCollection(topPosts);
  return { props };
}

export default withRemoteDataUpdates(Page);
