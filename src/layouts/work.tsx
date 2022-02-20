import _ from 'lodash';
import { useState } from 'react';
import Loader from 'react-loader-spinner';

import { Layout } from '../components/index';
import { getPageUrl } from '../utils';
import { markdownify, Link, withPrefix } from '../utils';
// import ReactMarkdown from 'react-markdown';

export const Work = (props) => {
  const renderProject = (project) => {
    const pageId = _.get(project, 'pageId');
    const projectUrl = getPageUrl(project, { withPrefix: true });
    const data = _.get(project, 'data');
    const content = _.get(project, 'content');
    const title = _.get(data, 'title');
    const description = _.get(data, 'description');
    // const skill = _.get(project, 'skill');
    // const summary = _.get(project, 'summary');
    const thumbnail = _.get(data, 'thumbnail');
    const [isLoading, setIsLoading] = useState(false);

    return (
      <article key={pageId} className="project">
        <Link href={projectUrl} className="project-link" onClick={() => setIsLoading(true)}>
          {thumbnail &&
            (isLoading ? (
              <div className="project-loader">
                <Loader type="MutatingDots" color="#23d3ff" height={80} width={80} />
              </div>
            ) : (
              <div className="project-thumbnail">
                <img src={withPrefix(`images/${thumbnail}`)} alt={thumbnail} />
              </div>
            ))}
          <header className="project-header">
            <h2 className="project-title">{title}</h2>
            <p>{description}</p>
            {/* <div className="project-skill">
              <label>使用技術</label>
              <p>{skill}</p>
            </div>
            <div className="project-summary">
              <label>概要</label>
              <p>{summary}</p>
            </div> */}
          </header>
        </Link>
      </article>
    );
  };

  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const works = _.get(props, 'works');
  const page = _.get(props, 'page');

  return (
    <Layout page={page} config={config}>
      {/* <>
        {!hideTitle && (
          <header className="page-header inner-sm outer">
            <h1 className="page-title line-top">{title}</h1>
          </header>
        )}
        {works.map((work) => (
          <div>
            {work.data.title}
            {/* <div>{markdownify(work.content)}</div> */}
      {/* </div>
        ))}
      </> */}
      <div className="inner outer">
        <header className="page-header inner-sm">
          <h1 className="page-title line-top">Works</h1>
          <div className="page-subtitle">これまでの開発事例</div>
        </header>
        <div className={`portfolio-feed layout-mosaic`}>{props.works.map((project) => renderProject(project))}</div>
      </div>
    </Layout>
  );
};

export default Work;
