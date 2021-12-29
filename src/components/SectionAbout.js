import React from 'react';
import _ from 'lodash';

import { htmlToReact, withPrefix, markdownify, Link } from '../utils';
import { CtaButtons } from '.';

export default class SectionAbount extends React.Component {
  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const image = _.get(section, 'image');
    const imageAlt = _.get(section, 'image_alt', '');
    const actions = _.get(section, 'actions');
    const content = _.get(section, 'content');

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
          {content && <div className="post-content inner-sm row-md">{markdownify(content)}</div>}
          {!_.isEmpty(actions) && (
            <div className="block-buttons inner-sm section-bottom-btn">
              <CtaButtons actions={actions} />
            </div>
          )}
        </div>
      </section>
    );
  }
}
