import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { GetServerSideProps } from 'next';

import pageLayouts from '../../../layouts';
import { getPageContent, getPosts, getPageHeading } from '../../../utils';
import { ConfigType, PostType, ProjectType } from '../../../types/layouts';

type PagePropsType = {
  data: {
    config: ConfigType;
  };
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

const getConfig = async () => {
  const filePath = path.join(process.cwd(), 'content/data/config.json');
  const config: ConfigType = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { data: { config } };
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  console.log('Page [id].js getServerSideProps, params: ', params);
  const props = await getConfig();
  const posts = await getPosts('post', params.id);

  if (posts) {
    const post = posts.find((po) => po.pageId === params.id);
    const pageContent = await getPageContent(params.id);
    const pageHeading = await getPageHeading(pageContent.content);

    props.page = {
      __metadata: { modelName: 'post', urlPath: '/blog' },
      seo: { title: posts[0].title, description: `${posts[0].category.map((cat) => cat + ',')} ${posts[0].title}` }
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
}

export default Post;
