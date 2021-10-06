import React from 'react';
import _ from 'lodash';

import { getPageUrl, htmlToReact, Link, withPrefix } from '../utils';

export default class SectionPortfolio extends React.Component {
  renderProject(project, index, projectCount, viewAllLabel, viewAllUrl) {
    const title = _.get(project, 'title');
    const skill = _.get(project, 'skill');
    const summary = _.get(project, 'summary');
    const thumbnail = _.get(project, 'thumbnail');
    const projectUrl = getPageUrl(project, { withPrefix: true });

    if (index === projectCount - 1 && viewAllLabel && viewAllUrl) {
      return (
        <article key={index} className="project">
          <Link href={withPrefix(viewAllUrl)} className="project-link view-all-link">
            {<img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} />
              && (
                <div className="project-thumbnail">
                  <img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} />
                </div>
              )}
          </Link>
          <span className="view-all-button button">{viewAllLabel}</span>
        </article>
      );
    } else {
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
  }

  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const layoutStyle = _.get(section, 'layout_style', 'mosaic');
    const viewAllLabel = _.get(section, 'view_all_label');
    const viewAllUrl = _.get(section, 'view_all_url');
    const recentProjects = _.get(this.props, 'projects');
    const projectCount = _.size(recentProjects);

    return (
      <section id={sectionId} className="block-portfolio block outer">
        <div className="inner">
          {(title || subtitle) && (
            <div className="block-header inner-sm">
              {title && <h2 className="block-title line-top">{title}</h2>}
              {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
            </div>
          )}
          <div className="block-content">
            <div className={`portfolio-feed layout-${layoutStyle}`}>
              {_.map(recentProjects, (project, index) => this.renderProject(project, index, projectCount, viewAllLabel, viewAllUrl))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
