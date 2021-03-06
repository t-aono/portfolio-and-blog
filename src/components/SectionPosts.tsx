import React, { useState } from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import Loader from 'react-loader-spinner';

import { getPageUrl, htmlToReact, classNames, Link } from '../utils';
import CtaButtons from './CtaButtons';
import { ActionType } from '../types/components';
import { PostType } from '../types/layouts';

type PropsType = {
  section: {
    section_id: string;
    title: string;
    subtitle: string;
    actions: ActionType;
    col_number: string;
    posts_number: number;
  };
};

export const SectionPosts = (props: PropsType) => {
  const section = _.get(props, 'section');
  const sectionId = _.get(section, 'section_id');
  const title = _.get(section, 'title');
  const subtitle = _.get(section, 'subtitle');
  const actions = _.get(section, 'actions');
  const colNumber = _.get(section, 'col_number', 'three');
  const posts = _.orderBy<PostType>(_.get(props, 'posts', []), 'date', 'desc');
  const postsNumber = _.get(section, 'posts_number', 3);
  const recentPosts = posts.slice(0, postsNumber);

  const renderPost = (post: PostType, index: number): JSX.Element => {
    const title = _.get(post, 'title');
    const emoji = _.get(post, 'emoji');
    const category = _.get(post, 'category');
    const excerpt = _.get(post, 'excerpt');
    const date = _.get(post, 'date');
    const dateTimeAttr: moment.Moment = moment(date).strftime('%Y-%m-%d');
    const formattedDate: moment.Moment = moment(date).strftime('%Y/%m/%d');
    const postUrl = getPageUrl(post, { withPrefix: true });
    const [isLoading, setIsLoading] = useState(false);

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          <Link href={postUrl} onClick={() => setIsLoading(true)}>
            {isLoading ? (
              <div className="post-loader">
                <Loader type="MutatingDots" color="#23d3ff" height={80} width={80} />
              </div>
            ) : (
              <div className="emoji-md">{emoji ? emoji : 'X'}</div>
            )}
          </Link>
          <div>
            <h3 className="post-title">
              <Link href={postUrl} onClick={() => setIsLoading(true)}>
                {title}
              </Link>
            </h3>
            {category && (
              <p className="post-category">
                {category.map((cat, index) => (
                  <span key={index}>{cat}</span>
                ))}
              </p>
            )}
            <div className="post-meta">
              <time className="published" dateTime={dateTimeAttr}>
                {formattedDate}
              </time>
            </div>
            {excerpt && <p className="post-content">{excerpt}</p>}
          </div>
        </div>
      </article>
    );
  };

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
            {_.map(recentPosts, (post, index) => renderPost(post, index))}
          </div>
        </div>
        {!_.isEmpty(actions) && (
          <div className="block-buttons inner-sm section-bottom-btn">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionPosts;
