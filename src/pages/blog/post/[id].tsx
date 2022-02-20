import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

import pageLayouts from '../../../layouts';
import { getPageContent, getPosts, getPageHeading, makePostCollection } from '../../../utils';
import { ContentType } from '../../../types/layouts';
import { ConfigType, PagePropsType } from '../../../types/pages';

type PageLayoutType = (props: PagePropsType) => JSX.Element;

const Post = (props: PagePropsType): JSX.Element => {
  const modelName = _.get(props, 'page.__metadata.modelName');
  const PageLayout: PageLayoutType = pageLayouts[modelName];
  if (!PageLayout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return <PageLayout {...props} />;
};

const getConfig = async (): Promise<ConfigType> => {
  const filePath = path.join(process.cwd(), 'content/data/config.json');
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { data: { config } };
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('Page [id].js getServerSideProps, params: ', params);
  const posts = await getPosts('post', params.id as string);
  const props = await getConfig();

  if (posts) {
    const postCollection = makePostCollection(posts);
    const post = postCollection.find((post) => post.pageId === params.id);
    const pageContent: { content: ContentType[] } = await getPageContent(params.id as string);
    const pageHeading = await getPageHeading(pageContent.content);

    props.page = {
      __metadata: { modelName: 'post', urlPath: '/blog' },
      seo: { title: postCollection[0].title, description: `${postCollection[0].category.map((cat) => cat + ',')} ${postCollection[0].title}` }
    };
    props.post = post;
    props.content = pageContent.content;
    props.heading = pageHeading;
  } else {
    props.page = {
      __metadata: { modelName: 'post', urlPath: '/blog' },
      seo: { title: 'メンテナンス中', description: '' }
    };
    props.post = {};
    props.content = null;
  }

  return { props };
};

export default Post;
