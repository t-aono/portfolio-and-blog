import React from 'react';
import _ from 'lodash';

import { getPageUrl, htmlToReact, Link, withPrefix } from '../utils';
import { CtaButtons } from '.';

export default class SectionPortfolio extends React.Component {
  renderProject(project, index, projectCount) {
    const title = _.get(project, 'title');
    const skill = _.get(project, 'skill');
    const summary = _.get(project, 'summary');
    const thumbnail = _.get(project, 'thumbnail');
    const projectUrl = getPageUrl(project, { withPrefix: true });

    return (
      <article key={index} className="project">
        <Link href={projectUrl} className="project-link">
          {thumbnail && (
            <div className="project-thumbnail">
              <img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} />
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
    )
  }

  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const layoutStyle = _.get(section, 'layout_style', 'mosaic');
    const actions = _.get(section, 'actions');
    const projects = _.get(this.props, 'projects');
    const recentProjects = projects.slice(0, 4);
    const projectCount = _.size(recentProjects);

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
            <div className={`portfolio-feed layout-${layoutStyle}`}>
              {_.map(recentProjects, (project, index) => this.renderProject(project, index, projectCount))}
            </div>
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
}
