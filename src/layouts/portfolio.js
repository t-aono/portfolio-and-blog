import React, { useState } from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { getPageUrl, Link, withPrefix } from '../utils';

export default function Portfolio (props) {
  const renderProject = (project) => {
    const pageId = _.get(project, 'pageId');
    const projectUrl = getPageUrl(project, { withPrefix: true });
    const title = _.get(project, 'title');
    const skill = _.get(project, 'skill');
    const summary = _.get(project, 'summary');
    const thumbnail = _.get(project, 'thumbnail');
    // const date = _.get(project, 'date');
    // const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    // const formattedDate = moment(date).strftime('%Y/%m/%d');
    const loadingImage = '/images/svg-loader-spinning-circles.svg';
    const [isLoading, setIsLoading] = useState(false);

    return (
      <article key={pageId} className="project">
        <Link href={projectUrl} className="project-link" onClick={() => setIsLoading(true)}>
          {thumbnail && (
            <div className="project-thumbnail">
              {isLoading ? (
                <img src={withPrefix(loadingImage)} alt={loadingImage.replace(/images\//g, '')} />
              ) : (
                <img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} />
              )}
            </div>
          )}
          <header className="project-header">
            <h2 className="project-title">{title}</h2>
            <div className="project-skill">
              <label>使用技術</label>
              <p>{skill}</p>
            </div>
            <div className="project-summary">
              <label>概要</label>
              <p>{summary}</p>
            </div>
          </header>
        </Link>
      </article>
    );
  };

  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  const title = _.get(page, 'title');
  const subtitle = _.get(page, 'subtitle');
  const layoutStyle = _.get(page, 'layout_style', 'mosaic');

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        <header className="page-header inner-sm">
          <h1 className="page-title line-top">{title}</h1>
          <div className="page-subtitle">{subtitle}</div>
        </header>
        <div className={`portfolio-feed layout-${layoutStyle}`}>{props.projects.map((project) => renderProject(project))}</div>
      </div>
    </Layout>
  );
};
