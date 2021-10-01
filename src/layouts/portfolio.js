import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { getPageUrl, Link, withPrefix } from '../utils';

const { Client } = require("@notionhq/client")

export default class Portfolio extends React.Component {
    async fetchProjects() {
        console.log('fetch!!!!!');
        const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_TOKEN });
        const databaseId = 'a4928a93d9c0447fa889c7d60c5124a7';
        const response = await notion.databases.query({ database_id: databaseId });
        // console.log(response.results)
        return response.results.map(row => {
            // console.log('id: ' + row.id);
            // console.log('title: ' + row.properties.title.title[0].plain_text);
            // console.log('skill: ' + row.properties.skill.multi_select.map(skill => skill.name));
            // console.log('date: ' + row.properties.date.date.start.replace(/\-/g, '/'));
            return {
                pageId: row.id,
                title: row.properties.title.title[0].plain_text,
                skill: row.properties.skill.multi_select.map(skill => skill.name),
                date: row.properties.date.date.start.replace(/\-/g, '/')
            }
        });
    }

    renderProject(project) {
        const title = _.get(project, 'title');
        const thumbImage = ''//_.get(project, 'thumb_image');
        const thumbImageAlt = ''//_.get(project, 'thumb_image_alt', '');
        const projectUrl = ''//getPageUrl(project, { withPrefix: true });

        return (
            <article key={project.id} className="project">
                <Link href={projectUrl} className="project-link">
                    {thumbImage && (
                        <div className="project-thumbnail">
                            <img src={withPrefix(thumbImage)} alt={thumbImageAlt} />
                        </div>
                    )}
                    <header className="project-header">
                        <h2 className="project-title">{title}</h2>
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
        this.fetchProjects().then(res => {
            console.log(res)
        });

        return (
            <Layout page={page} config={config}>
                <div className="inner outer">
                    <header className="page-header inner-sm">
                        <h1 className="page-title line-top">{title}</h1>
                        {subtitle && <div className="page-subtitle">{subtitle}</div>}
                    </header>
                    <div className={`portfolio-feed layout-${layoutStyle}`}>
                        {/* {_.map(projects, (project, index) => this.renderProject(project, index))} */}
                    </div>
                </div>
            </Layout>
        );
    }
}
