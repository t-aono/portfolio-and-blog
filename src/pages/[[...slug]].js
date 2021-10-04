import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getProjects, getProjectPaths, getPostPaths, getPageDetail, getPosts } from '../utils';

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
  paths.push(...[... await getProjectPaths(), ... await getPostPaths()]);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log('Page [...slug].js getStaticProps, params: ', params);
  const pagePath = '/' + (params.slug ? params.slug.join('/') : '');
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
  
  if (params.slug && params.slug[0] === 'portfolio') {  // 制作物の一覧
    const projects = await getProjects();
  
    if (pagePath.match(/\/portfolio\/.+/)) {  // 制作物の詳細
      const project = projects.find(pj => pj.pageId === params.slug[1])
      const pageContent = await getPageDetail(params.slug[1]);
      props.page = {
        __metadata: {
          modelName: 'page'
        }
      }
      props.project = project;
      props.content = pageContent.content;
      return { props };
    }

    props.projects = projects;
    return { props }
  }

  if (params.slug && params.slug[0] === 'blog') {  // ブログの一覧
    const posts = await getPosts();

    // if (pagePath.match(/\/blog\/\d+/)) {  // ページネーション
      
    // } else 
    if (pagePath.match(/\/blog\/.+/)) {  // ブログの詳細
      const post = posts.find(po => po.pageId === params.slug[1])
      const pageContent = await getPageDetail(params.slug[1]);
      props.page = {
        __metadata: {
          modelName: 'post'
        }
      }
      props.post = post;
      props.content = pageContent.content;
      return { props };
    }

    props.posts = posts;
    return { props }
  }

  // トップページ
  const projects = await getProjects();
  props.projects = projects;
  
  return { props };
}

export default withRemoteDataUpdates(Page);
