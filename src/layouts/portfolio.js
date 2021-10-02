import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { getPageUrl, Link, withPrefix } from '../utils';

export default class Portfolio extends React.Component {

    renderProject(project) {
        const pageId = _.get(project, 'pageId');
        const projectUrl = getPageUrl(project, { withPrefix: true });
        const title = _.get(project, 'title');
        const skill = _.get(project, 'skill');
        const skillStr = skill.join(', ')
        const date = _.get(project, 'date');
        const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
        const formattedDate = moment(date).strftime('%Y/%m/%d');

        return (
            <article key={pageId} className="project">
                <Link href={projectUrl} className="project-link">
                    <header className="project-header">
                        <h2 className="project-title">{title}</h2>
                        <div>{skillStr}</div>
                        <div className="post-meta">
                            <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
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
        const subtitle = _.get(page, 'subtitle');
        const layoutStyle = _.get(page, 'layout_style', 'mosaic');
        // const projects = _.orderBy(_.get(this.props, 'projects', []), 'date', 'desc');
        // console.log(this.props.projects)
        return (
            <Layout page={page} config={config}>
                <div className="inner outer">
                    <header className="page-header inner-sm">
                        <h1 className="page-title line-top">{title}</h1>
                        {subtitle && <div className="page-subtitle">{subtitle}</div>}
                    </header>
                    <div className={`portfolio-feed layout-${layoutStyle}`}>
                        {/* {_.map(projects, (project, index) => this.renderProject(project, index))} */}
                        {this.props.projects.map(project => this.renderProject(project))}
                    </div>
                </div>
            </Layout>
        );
    }
}
