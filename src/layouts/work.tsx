import _ from 'lodash';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify, getWorkList } from '../utils';
import { PageType, ConfigType } from '../types/layouts';

export const Work = async (props) => {
  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  console.log(config, page);
  const markdownContent = _.get(page, 'markdown_content');

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        aaa work
        <article>{markdownContent}</article>
      </div>
    </Layout>
  );
};

export default Work;
