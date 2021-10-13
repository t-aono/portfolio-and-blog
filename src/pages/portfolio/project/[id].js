import { useRouter } from 'next/router';
import { getPageContent, getProjects } from '../../../utils';
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import { withRemoteDataUpdates } from 'sourcebit-target-next/with-remote-data-updates';

import pageLayouts from '../../../layouts';

const Project = (props) => {
  // console.log(props)
  // const router = useRouter();
  // const { id } = router.query;
  // return <p>Project: {id}</p>;

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
  return { data: { config }};
}

export async function getServerSideProps({ params }) {
  console.log('Page [id].js getServerSideProps, params: ', params);

  const props = await getConfig();
console.log(props.data)
  const projects = await getProjects();
  const project = projects.find(pj => pj.pageId === params.id);
  const pageContent = await getPageContent(params.id);
  /*
  const props = {
    page: {
      __metadata: { modelName: 'project', urlPath: '/portfolio' },
      seo: { title: project.title, description: `${project.skill} を使って${project.title}を制作` }
    },
    project: project,
    content: pageContent.content
  }
  */
  props.page = {
    __metadata: { modelName: 'project', urlPath: '/portfolio' },
    seo: { title: project.title, description: `${project.skill} を使って${project.title}を制作` },
  }
  props.project = project;
  props.content = pageContent.content;
  return { props };
}

// export default Project;
export default withRemoteDataUpdates(Project);