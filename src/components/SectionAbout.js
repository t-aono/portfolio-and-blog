import React from 'react';
import _ from 'lodash';

import { htmlToReact, withPrefix, markdownify } from '../utils';

export default class SectionAbount extends React.Component {
  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const image = _.get(section, 'image');
    const imageAlt = _.get(section, 'image_alt', '');
    const about = _.get(this.props, 'about');

    return (
      <section id={sectionId} className="block block-text outer">
        <div className="inner">
          {(title || subtitle) && (
            <div className="block-header inner-sm">
              {title && <h2 className="block-title line-top">{title}</h2>}
              {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
            </div>
          )}
          {image && (
            <div className="block-image">
              <img src={withPrefix(image)} alt={imageAlt} />
            </div>
          )}
          {about.content.map(item => (
            <div className="post-content inner-sm" key={item.block.id}>
              {(item.type === 'paragraph') ? (
                <div>
                  {(item.block.paragraph.text.length > 0) ? (
                    item.block.paragraph.text.map(text => (text.href) ? (
                      <Link href={text.href} target="_blank" key={text.plain_text}>{text.plain_text}</Link>
                    ) : <span key={text.plain_text}>{text.plain_text}</span>)
                  ) : "　"}
                </div>
              ) : ''}
            </div>
          ))}
        </div>
      </section>
    );
  }
}
