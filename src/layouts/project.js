import React from 'react';
import _ from 'lodash';
import Router from 'next/router';

import { Layout, Fixing } from '../components/index';
import { withPrefix, Link } from '../utils';

export default class Project extends React.Component {
  render() {
    const project = _.get(this.props, 'project');
    const thumbnail = _.get(project, 'thumbnail');
    const title = _.get(project, 'title');
    const skill = _.get(project, 'skill');
    const term = _.get(project, 'term');
    const content = _.get(this.props, 'content');
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');

    if (!content) {
      return <Fixing page={page} config={config} />;
    }

    return (
      <Layout page={page} config={config}>
        <div className="inner outer">
          <article className="post post-full">
            <header className="post-header inner-sm">
              <h1 className="post-title line-top">{title}</h1>
              <div className="post-subtitle">
                <span>{skill}</span>
              </div>
              <div className="post-date">
                <span>{term}</span>
              </div>
              {thumbnail && (
                <div className="project-page-thumbnail">
                  <img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} />
                </div>
              )}
            </header>
            {content.map((item) => (
              <div className="post-content inner-sm" key={item.block.id}>
                {item.type === 'heading_2' ? <p className="heading-2">{item.block.heading_2.text[0].text.content}</p> : ''}
                {item.type === 'heading_3' ? <p className="heading-3">{item.block.heading_3.text[0].text.content}</p> : ''}
                {item.type === 'image' ? (
                  <div className="capture-wrap">
                    <img src={item.block.image.file.url} className="capture-image" />
                  </div>
                ) : (
                  ''
                )}
                {item.type === 'paragraph' ? (
                  <div>
                    {item.block.paragraph.text.length > 0
                      ? item.block.paragraph.text.map((text) =>
                          text.href ? (
                            <Link href={text.href} target="_blank" key={text.href}>
                              {text.plain_text}
                            </Link>
                          ) : (
                            <span key={text.plain_text}>{text.plain_text}</span>
                          )
                        )
                      : '　'}
                  </div>
                ) : (
                  ''
                )}
                {item.type === 'bulleted_list_item' ? <li>{item.block.bulleted_list_item.text[0].plain_text}</li> : ''}
              </div>
            ))}
            <footer className="post-meta inner-sm back-btn">
              <span className="button" onClick={() => Router.back()}>
                一覧に戻る
              </span>
            </footer>
          </article>
        </div>
      </Layout>
    );
  }
}
