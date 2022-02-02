import _ from 'lodash';
import fs from 'fs';
import path from 'path';

import pageLayouts from '../../../layouts';
import { getPageContent, getProjects, makeProjectCollection } from '../../../utils';
import { ConfigType, PagePropsType } from '../../../types/pages';
import { GetServerSideProps } from 'next';
import { ContentType } from '../../../types/layouts';

const Project = (props: PagePropsType): JSX.Element => {
  const modelName = _.get(props, 'page.__metadata.modelName');
  const PageLayout = pageLayouts[modelName];
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
  const projects = await getProjects();
  const projectCollection = makeProjectCollection(projects);
  const project = projectCollection.find((project) => project.pageId === params.id);
  const props = await getConfig();
  
  if (projectCollection) {
    const pageContent: { content: ContentType[] } = await getPageContent(params.id);
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
    props.content = null;
  }

  return { props };
}

export default Project;
