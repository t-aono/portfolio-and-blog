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
        const content1 = _.get(section, 'content1');
        const content2 = _.get(section, 'content2');
        const content3 = _.get(section, 'content3');

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
                    {content1 && <div className="block-content inner-sm">{markdownify(content1)}</div>}
                    {content2 && <div className="block-content inner-sm">{markdownify(content2)}</div>}
                    {content3 && <div className="block-content inner-sm">{markdownify(content3)}</div>}
                </div>
            </section>
        );
    }
}
