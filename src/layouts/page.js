import React from 'react';
import _ from 'lodash';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify, Link } from '../utils';

export default class Page extends React.Component {
  render() {
    const project = _.get(this.props, 'project');
    const content = _.get(this.props, 'content');
    // console.log(content)
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');
    const title = _.get(page, 'title');
    const subtitle = _.get(page, 'subtitle');
    const image = _.get(page, 'image');
    const imageAlt = _.get(page, 'image_alt', '');
    const markdownContent = _.get(page, 'markdown_content');

    return (
      <Layout page={page} config={config}>
        <div className="inner outer">
          <article className="post post-full">
            <header className="post-header inner-sm">
              <h1 className="post-title line-top">{project.title}</h1>
              <div className="post-subtitle">
                {project.skill && project.skill.map(skill => <span key={skill}>{htmlToReact(skill)}</span>)}
              </div>
              <div className="post-subtitle date">{project.date}</div>
            </header>
            {image && (
              <div className="post-image">
                <img src={withPrefix(image)} alt={imageAlt} />
              </div>
            )}
            {content.map(item => (
              <div className="post-content inner-sm" key={item.block.id}>
                {/* {console.log(item.block)} */}
                {(item.type === 'heading_2') ? <h2>{item.block.heading_2.text[0].text.content}</h2> : ''}
                {(item.type === 'heading_3') ? <h3>{item.block.heading_3.text[0].text.content}</h3> : ''}
                {(item.type === 'image') ? <img src={item.block.image.file.url} /> : ''}
                {(item.type === 'paragraph' && item.block.paragraph.text.length > 0) ? (
                  <div>
                    {item.block.paragraph.text.map(text => (text.href) ? (
                      <Link href={text.href} target="_blank" key={text.href}>{text.plain_text}</Link>
                    ) : <span key={text.href}>{text.plain_text}</span>)}
                  </div>
                ) : ''}
                {(item.type === 'bulleted_list_item') ? <li>{item.block.bulleted_list_item.text[0].plain_text}</li> : ''}
                {/* {(item.type === 'unsupport') ? console.log(item) : ''} */}
              </div>
            ))}
          </article>
        </div>
      </Layout>
    );
  }
}
