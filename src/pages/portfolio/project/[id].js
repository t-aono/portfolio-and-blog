import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import pageLayouts from '../../../layouts';
import { getPageContent, getProjects } from '../../../utils';

const Project = (props) => {
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
  const projects = await getProjects();
  const project = projects.find((pj) => pj.pageId === params.id);
  const pageContent = await getPageContent(params.id);
  const props = await getConfig();

  if (project !== undefined) {
    props.page = {
      __metadata: { modelName: 'project', urlPath: '/portfolio' },
      seo: { title: project.title, description: `${project.skill} を使って${project.title}を制作` }
    };
    props.project = project;
    props.content = pageContent.content;
  } else {
    props.page = {
      __metadata: { modelName: 'project', urlPath: '/portfolio' },
      seo: { title: 'メンテナンス中', description: '' }
    };
    props.project = {};
    props.pageContent = null;
  }

  return { props };
}

export default Project;
