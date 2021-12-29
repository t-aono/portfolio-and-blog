import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import pageLayouts from '../../../layouts';
import { getPageContent, getPosts } from '../../../utils';

const Post = (props) => {
  const modelName = _.get(props, 'page.__metadata.modelName');
  const PageLayout = pageLayouts[modelName];
  if (!PageLayout) {
    throw new Error(`no page layout matching the page model: ${modelName}`);
  }
  return <PageLayout {...props} />;
};

const getConfig = async () => {
  const filePath = path.join(process.cwd(), 'content/data/config.json');
  const config = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  return { data: { config } };
};

export async function getServerSideProps({ params }) {
  console.log('Page [id].js getServerSideProps, params: ', params);
  const props = await getConfig();
  const posts = await getPosts('post', params.id);

  if (posts) {
    const post = posts.find((po) => po.pageId === params.id);
    const pageContent = await getPageContent(params.id);

    props.page = {
      __metadata: { modelName: 'post', urlPath: '/blog' },
      seo: { title: posts[0].title, description: `${posts[0].category.map((cat) => cat + ',')} ${posts[0].title}` }
    };
    props.post = post;
    props.content = pageContent.content;
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
