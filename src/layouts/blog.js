import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { classNames, getPageUrl, Link, withPrefix } from '../utils';

export default class Blog extends React.Component {
  renderPost(post, index) {
    const title = _.get(post, 'title');
    const category = _.get(post, 'category');
    const thumbnail = _.get(post, 'thumbnail');
    // const excerpt = _.get(post, 'excerpt');
    const date = _.get(post, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate = moment(date).strftime('%Y/%m/%d');
    const postUrl = getPageUrl(post, { withPrefix: true });

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          {thumbnail && <Link className="post-thumbnail" href={postUrl}><img src={withPrefix(thumbnail)} alt={thumbnail.replace(/images\//g, '')} /></Link>}
          <header className="post-header">
            <h2 className="post-title"><Link href={postUrl}>{title}</Link></h2>
            {category && <p className="post-category">{category.map((cat, index) => <span key={index}>{cat}</span>)}</p>}
            <div className="post-meta">
              <time className="published" dateTime={dateTimeAttr}>{formattedDate}</time>
            </div>
          </header>
          {/* {excerpt && <p className="post-content">{excerpt}</p>} */}
        </div>
      </article>
    );
  }

  render() {
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');
    const title = _.get(page, 'title');
    const subtitle = _.get(page, 'subtitle');
    const hideTitle = _.get(page, 'hide_title');
    const colNumber = _.get(page, 'col_number', 'three');

    return (
      <Layout page={page} config={config}>
        <div className="inner outer">
          <header
            className={classNames('page-header', 'inner-sm', {
              'screen-reader-text': hideTitle
            })}
          >
            <h1 className="page-title line-top">{title}</h1>
            <div className="page-subtitle">{subtitle}</div>
          </header>
          <div
            className={classNames('post-feed', 'grid', {
              'grid-col-2': colNumber === 'two',
              'grid-col-3': colNumber === 'three'
            })}
          >
            {this.props.posts.map((post, index) => this.renderPost(post, index))}
          </div>
        </div>
        <div className="pagenate-btn">
          <Link to="/" className="button">前へ</Link>
          <Link to="/" className="button">次へ</Link>
        </div>
      </Layout>
    );
  }
}
