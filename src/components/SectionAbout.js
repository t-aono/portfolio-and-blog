import React from 'react';
import _ from 'lodash';

import { htmlToReact, withPrefix, markdownify, Link } from '../utils';
import { CtaButtons, Icon } from '.';

export default class SectionAbount extends React.Component {
  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const image = _.get(section, 'image');
    const imageAlt = _.get(section, 'image_alt', '');
    const actions = _.get(section, 'actions');
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
                    item.block.paragraph.text.map((text, index) => (text.href) ? (
                      <Link href={text.href} target="_blank" key={index} style={{ borderBottom: 0 }}>
                        <div style={{ display: 'flex' }}><Icon icon="github" />&ensp;{text.plain_text}</div>
                      </Link>
                    ) : <span key={index}>{text.plain_text}</span>)
                  ) : "　"}
                </div>
              ) : ''}
            </div>
          ))}
          {!_.isEmpty(actions) && (
            <div className="block-buttons inner-sm" style={{marginTop: '3em'}}>
              <CtaButtons actions={actions} />
            </div>
          )}
        </div>
      </section>
    );
  }
}
