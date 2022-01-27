import React, { useState } from 'react';
import _ from 'lodash';
import Loader from 'react-loader-spinner';

import { getPageUrl, htmlToReact, Link, withPrefix } from '../utils';
import { CtaButtons } from '.';

export default function SectionPortfolio(props) {
  const renderProject = (project, index) => {
    const title = _.get(project, 'title');
    const skill = _.get(project, 'skill');
    const summary = _.get(project, 'summary');
    const thumbnail = _.get(project, 'thumbnail');
    const projectUrl = getPageUrl(project, { withPrefix: true });
    const [isLoading, setIsLoading] = useState(true);

    return (
      <article key={index} className="project">
        <Link href={projectUrl} className="project-link" onClick={() => setIsLoading(true)}>
          {thumbnail &&
            (isLoading ? (
              <div className="project-loader">
                <Loader type="MutatingDots" color="#23d3ff" height={80} width={80} />
              </div>
            ) : (
              <div className="project-thumbnail">
                <img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} />
              </div>
            ))}
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

  const section = _.get(props, 'section');
  const sectionId = _.get(section, 'section_id');
  const title = _.get(section, 'title');
  const subtitle = _.get(section, 'subtitle');
  const layoutStyle = _.get(section, 'layout_style', 'mosaic');
  const actions = _.get(section, 'actions');
  const projects = _.get(props, 'projects');
  const recentProjects = projects.slice(0, 4);

  return (
    <section id={sectionId} className="block-portfolio block outer">
      <div className="inner">
        {(title || subtitle) && (
          <div className="block-header inner-sm porfolio-header">
            {title && <h2 className="block-title line-top">{title}</h2>}
            {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
          </div>
        )}
        <div className="block-content">
          <div className={`portfolio-feed layout-${layoutStyle}`}>{_.map(recentProjects, (project, index) => renderProject(project, index))}</div>
        </div>
        {!_.isEmpty(actions) && (
          <div className="block-buttons inner-sm section-bottom-btn portfolio-more">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
}
