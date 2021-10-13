import React from 'react';
import _ from 'lodash';
import { sourcebitDataClient } from 'sourcebit-target-next';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';
import { getProjects, getProjectPaths, getPageContent, getPosts } from '../utils';

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
  const blogPagePaths = postPaths.map((p, i) => (i % 12 === 0) ? `/blog/page-no/${i / 12 + 2}` : null).filter(v => v);
  paths.push(...[... await getProjectPaths(), ...postPaths, ...blogPagePaths]);
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  console.log('Page [...slug].js getStaticProps, params: ', params);
  const pagePath = '/' + (params.slug ? params.slug.join('/') : '');
  const props = await sourcebitDataClient.getStaticPropsForPageAtPath(pagePath);
console.log(props.data)
  if (params.slug && params.slug[0] === 'portfolio') {
    const projects = await getProjects();
/*
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
*/
    props.projects = projects;
    return { props }
  }

  if (params.slug && params.slug[0] === 'blog') {
    let posts = [];
    
    if (params.slug[1] && params.slug[1] === 'page-no') {
      // ページネーション
      props.page_no = params.slug[2];
      const postIds = await getPosts('id');
      props.post_count = postIds.length;
      posts = await getPosts('post', postIds[(params.slug[2] - 1) * 12]);
      props.page = props.pages.find(p => p.title === 'Blog');
    } else if (params.slug[1] && params.slug[1] !== 'page-no') {
      // 個別ページ
      posts = await getPosts('post', params.slug[1]);
      const pageContent = await getPageContent(params.slug[1]);
      props.page = {
        __metadata: { modelName: 'post', urlPath: '/blog' },
        seo: { title: posts[0].title, description: `${posts[0].category.map(cat => cat + ',')} ${posts[0].title}` }
      }
      props.post = posts[0];
      props.content = pageContent.content;
      return { props };
    } else {
      // 初期の一覧ページ
      props.page_no = 1;
      posts = await getPosts('post');
    }

    props.posts = posts;
    return { props }
  }

  if (params.slug && params.slug[0] === 'skillsheet') {
    const pageContent = await getPageContent('7a6de0538ee94b709afaa72fe4069725');
    props.content = pageContent.content;
    props.page = props.page = props.pages.find(p => p.title === 'Skill Sheet');
    props.page.__metadata.modelName = 'skillsheet';
    return { props }
  }

  props.projects = await getProjects();
  props.posts = await getPosts('post');
  props.about = await getPageContent('cc9fe3c1f4774928ad90e364892f0c2b');
  return { props };
}

export default withRemoteDataUpdates(Page);
