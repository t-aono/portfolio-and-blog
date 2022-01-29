import _ from 'lodash';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify } from '../utils';
import { PageType, ConfigType } from '../types/layouts';

type PropsType = PageType | ConfigType;

export const Page = (props: PropsType): JSX.Element => {
  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  const title = _.get(page, 'title');
  const subtitle = _.get(page, 'subtitle');
  const image = _.get(page, 'image');
  const imageAlt = _.get(page, 'image_alt', '');
  const imageType = _.get(page, 'image_type', '');
  const markdownContent = _.get(page, 'markdown_content');
  const path = _.get(props, 'path');

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title line-top">{title}</h1>
            {subtitle && <div className="post-subtitle">{htmlToReact(subtitle)}</div>}
          </header>
          {image && (
            <div className={imageType ? imageType : 'post-image'}>
              <img src={withPrefix(image)} alt={imageAlt} />
            </div>
          )}
          {markdownContent && <div className={(path === '/thank-you' ? 'message-center ' : 'post-content ') + 'inner-sm'}>{markdownify(markdownContent)}</div>}
        </article>
      </div>
    </Layout>
  );
};

export default Page;
