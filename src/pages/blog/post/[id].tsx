import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

import pageLayouts from '../../../layouts';
import { getPageContent, getPosts, getPageHeading, makePostCollection } from '../../../utils';
import { ContentType, PostType, ProjectType } from '../../../types/layouts';

type PagePropsType = {
  posts: PostType[];
  projects: ProjectType[];
  'page.__metadata.modelName': string;
};

type PageLayoutType = (props: PagePropsType) => JSX.Element;

const Post = (props: PagePropsType): JSX.Element => {
  const modelName = _.get(props, 'page.__metadata.modelName');
  const PageLayout: PageLayoutType = pageLayouts[modelName];
  if (!PageLayout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return <PageLayout {...props} />;
};

type ConfigType = {
  data: { config: {} };
  page?: {
    __metadata: { modelName: string; urlPath: string };
    seo: { title: string; description: string };
  };
  post?: PostType[];
  content?: ContentType[];
  heading?: string;
};

const getConfig = async (): Promise<ConfigType> => {
  const filePath = path.join(process.cwd(), 'content/data/config.json');
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { data: { config } };
};

type PostsType = {
  icon: { emoji: string };
  id: string;
  properties: {
    title: { title: { plain_text: string }[] };
    category: { multi_select: { name: string }[] };
    date: { date: { start: string } };
  };
}[];

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('Page [id].js getServerSideProps, params: ', params);
  const props = await getConfig();
  const posts = await getPosts('post', params.id as string);
  const postCollection = makePostCollection(posts);

  if (posts) {
    const post = postCollection.find((post) => post.pageId === params.id);
    const pageContent: { content: ContentType[] } = await getPageContent(params.id);
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
