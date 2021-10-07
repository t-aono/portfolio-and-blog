import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getProjects, getProjectPaths, getPostPaths, getPageContent, getPosts } from '../utils';

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

  if (params.slug && params.slug[0] === 'portfolio') {
    // 制作物
    const projects = await getProjects();

    if (pagePath.match(/\/portfolio\/.+/)) {
      const project = projects.find(pj => pj.pageId === params.slug[1]);
      const pageContent = await getPageContent(params.slug[1]);
      props.page = {
        __metadata: { modelName: 'project', urlPath: '/portfolio' },
        seo: { title: project.title, description: `${project.skill} を使って${project.title}を制作` }
      }
      props.project = project;
      props.content = pageContent.content;
      return { props };
    }

    props.projects = projects;
    return { props }
  }

  if (params.slug && params.slug[0] === 'blog') {
    // ブログの一覧
    const posts = await getPosts();

    // if (pagePath.match(/\/blog\/\d+/)) {  // ページネーション

    // } else 
    if (pagePath.match(/\/blog\/.+/)) {
      // ブログの詳細
      const post = posts.find(po => po.pageId === params.slug[1])
      const pageContent = await getPageContent(params.slug[1]);
      props.page = {
        __metadata: { modelName: 'post', urlPath: '/blog' },
        seo: { title: post.title, description: `${post.category.map(cat => cat + ',')} ${post.title}` }
      }
      props.post = post;
      props.content = pageContent.content;
      return { props };
    }

    props.posts = posts;
    return { props }
  }

  if (params.slug && params.slug[0] === 'skillsheet') {
    // スキルシート
    const pageContent = await getPageContent('7a6de0538ee94b709afaa72fe4069725');
    props.content = pageContent.content;
    props.page.__metadata.modelName = 'skillsheet';
    return { props }
  }

  // トップページ
  props.projects = await getProjects(6);
  props.posts = await getPosts(3);
  props.about = await getPageContent('cc9fe3c1f4774928ad90e364892f0c2b');
  return { props };
}

export default withRemoteDataUpdates(Page);
