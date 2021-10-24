import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { getPageUrl, htmlToReact, classNames, Link, withPrefix } from '../utils';
import CtaButtons from './CtaButtons';

export default class SectionPosts extends React.Component {
  renderPost(post, index) {
    const title = _.get(post, 'title');
    const thumbnail = (_.get(post, 'thumbnail')) ? _.get(post, 'thumbnail') : 'images/jellyfish.jpg';
    const category = _.get(post, 'category');
    const excerpt = _.get(post, 'excerpt');
    const date = _.get(post, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d');
    const formattedDate = moment(date).strftime('%Y/%m/%d');
    const postUrl = getPageUrl(post, { withPrefix: true });

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          {thumbnail && <Link className="post-thumbnail" href={postUrl}><img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} /></Link>}
          <header className="post-header">
            <h3 className="post-title"><Link href={postUrl}>{title}</Link></h3>
            {category && <p className="post-category">{category.map((cat, index) => <span key={index}>{cat}</span>)}</p>}
            <div className="post-meta">
              <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
            </div>
          </header>
          {excerpt && <p className="post-content">{excerpt}</p>}
        </div>
      </article>
    );
  }

  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const actions = _.get(section, 'actions');
    const colNumber = _.get(section, 'col_number', 'three');
    const posts = _.orderBy(_.get(this.props, 'posts', []), 'date', 'desc');
    const postsNumber = _.get(section, 'posts_number', 3);
    const recentPosts = posts.slice(0, postsNumber);

    return (
      <section id={sectionId} className="block block-posts outer">
        <div className="inner">
          {(title || subtitle) && (
            <div className="block-header inner-sm">
              {title && <h2 className="block-title line-top">{title}</h2>}
              {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
            </div>
          )}
          <div className="block-content">
            <div
              className={classNames('post-feed', 'grid', {
                'grid-col-2': colNumber === 'two',
                'grid-col-3': colNumber === 'three'
              })}
            >
              {_.map(recentPosts, (post, index) => this.renderPost(post, index))}
            </div>
          </div>
          {!_.isEmpty(actions) && (
            <div className="block-buttons inner-sm">
              <CtaButtons actions={actions} />
            </div>
          )}
        </div>
      </section>
    );
  }
}
