import _ from 'lodash';

import components, { Layout } from '../components/index';
import { getPageUrl } from '../utils';
import { PageType, ConfigType, PostType, ProjectType } from '../types/layouts';

type PropsType = {
  data: {
    config: ConfigType;
  };
  posts: PostType[];
  projects: ProjectType[];
  page: PageType;
};

export const Advanced = (props: PropsType) => {
  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const posts = _.get(props, 'posts');
  const projects = _.get(props, 'projects');
  const page = _.get(props, 'page');
  const hideTitle = _.get(page, 'hide_title');
  const title = _.get(page, 'title');
  const sections = _.get(page, 'sections');
  const pageUrl = getPageUrl(page);

  return (
    <Layout page={page} config={config}>
      <>
        {!hideTitle && (
          <header className="page-header inner-sm outer">
            <h1 className="page-title line-top">{title}</h1>
          </header>
        )}
        {_.map(sections, (section, index) => {
          const sectionType = _.get(section, 'type');
          const component = _.upperFirst(_.camelCase(sectionType));
          if (!component) {
            throw new Error(`page section does not have the 'type' property, page: ${pageUrl}`);
          }
          const Component = components[component];
          if (!Component) {
            throw new Error(`no component matching the page section's type: ${sectionType}`);
          }
          return <Component key={index} section={section} data={data} posts={posts} projects={projects} />;
        })}
      </>
    </Layout>
  );
};

export default Advanced;
