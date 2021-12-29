import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getProjects, getPosts, getCategories } from '../utils';

import pageLayouts from '../layouts';

class Page extends React.Component {
  render() {
    const modelName = _.get(this.props, 'page.__metadata.modelName');
    const PageLayout = pageLayouts[modelName];
    if (!PageLayout) {
      throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    return <PageLayout {...this.props} />;
  }
}

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
    props.projects = await getProjects();
    return { props };
  }

  if (params.slug && params.slug[0] === 'blog') {
    if (params.slug[1] && params.slug[1] === 'paginate') {
      // ページネーション
      props.page_no = params.slug[2];
      const postIds = await getPosts('id');
      props.post_count = postIds.length;
      props.posts = await getPosts('post', postIds[(params.slug[2] - 1) * 12]);
      props.page = props.pages.find((p) => p.title === 'Blog');
    } else {
      // １ページ目
      props.page_no = 1;
      props.posts = await getPosts('post');
    }
    props.categories = await getCategories();
    return { props };
  }

  // トップページ
  props.projects = await getProjects();
  props.posts = await getPosts('post');
  return { props };
}

export default withRemoteDataUpdates(Page);
