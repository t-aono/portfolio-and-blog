import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, Link } from '../utils';

export default class Page extends React.Component {
  render() {
    const project = _.get(this.props, 'project');
    const content = _.get(this.props, 'content');
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');
    const image = _.get(page, 'image');
    const imageAlt = _.get(page, 'image_alt', '');

    return (
      <Layout page={page} config={config}>
        <div className="inner outer">
          <article className="post post-full">
            <header className="post-header inner-sm">
              <h1 className="post-title line-top">{project.title}</h1>
              <div className="post-subtitle">
                <span>{project.skill}</span>
                <span className="post-date">{project.date}</span>
              </div>
            </header>
            {image && (
              <div className="post-image">
                <img src={withPrefix(image)} alt={imageAlt} />
              </div>
            )}
            {content.map(item => (
              <div className="post-content inner-sm" key={item.block.id}>
                {/* {console.log(item.type)} */}
                {(item.type === 'heading_2') ? <p className="heading-2">{item.block.heading_2.text[0].text.content}</p> : ''}
                {(item.type === 'heading_3') ? <p className="heading-3">{item.block.heading_3.text[0].text.content}</p> : ''}
                {(item.type === 'image') ? <div className="capture-wrap"><img src={item.block.image.file.url} className="capture-image" /></div> : ''}
                {(item.type === 'paragraph') ? (
                  <div>
                    {(item.block.paragraph.text.length > 0) ? (
                      item.block.paragraph.text.map(text => (text.href) ? (
                        <Link href={text.href} target="_blank" key={text.href}>{text.plain_text}</Link>
                      ) : <span key={text.href}>{text.plain_text}</span>)
                    ) : "　"}
                  </div>
                ) : ''}
                {(item.type === 'bulleted_list_item') ? <li>{item.block.bulleted_list_item.text[0].plain_text}</li> : ''}
              </div>
            ))}
          </article>
        </div>
      </Layout>
    );
  }
}
