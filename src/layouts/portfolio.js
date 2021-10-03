import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { getPageUrl, Link, withPrefix } from '../utils';

export default class Portfolio extends React.Component {

  renderProject(project) {
    const pageId = _.get(project, 'pageId');
    const projectUrl = getPageUrl(project, { withPrefix: true });
    const title = _.get(project, 'title');
    const skill = _.get(project, 'skill');
    const summary = _.get(project, 'summary');
    // const date = _.get(project, 'date');
    // const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    // const formattedDate = moment(date).strftime('%Y/%m/%d');

    return (
      <article key={pageId} className="project">
        <Link href={projectUrl} className="project-link">
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
  }

  render() {
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');
    const title = _.get(page, 'title');
    const layoutStyle = _.get(page, 'layout_style', 'mosaic');

    return (
      <Layout page={page} config={config}>
        <div className="inner outer">
          <header className="page-header inner-sm">
            <h1 className="page-title line-top">{title}</h1>
            <div className="page-subtitle">個人で制作したWebアプリなどの制作物です。</div>
          </header>
          <div className={`portfolio-feed layout-${layoutStyle}`}>
            {this.props.projects.map(project => this.renderProject(project))}
          </div>
        </div>
      </Layout>
    );
  }
}
