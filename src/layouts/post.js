import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Prism from 'prismjs';
import Router from 'next/router';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { withPrefix, Link, getPageUrl } from '../utils';

const Post = (props) => {
  const post = _.get(props, 'post');
  const content = _.get(props, 'content');
  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  const date = post.date ? post.date.replace(/\-/g, '/') : '';
  const mainteImage = '/images/construction_simple.png';

  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    Prism.highlightAll();

    fetch('/api/search', {
      body: JSON.stringify({ query: post.category[0], pageSize: 3 }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setRelatedPosts(data.filter((p) => p.pageId !== post.pageId));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const renderRelatedPosts = (post) => {
    const title = _.get(post, 'title');
    const category = _.get(post, 'category');
    const emoji = _.get(post, 'emoji');
    const date = _.get(post, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate = moment(date).strftime('%Y/%m/%d');
    const postUrl = getPageUrl(post, { withPrefix: true });

    return (
      <div className="inner-sm related-posts" key={post.pageId}>
        <Link href={postUrl}>
          <div className="emoji-md">{emoji ? emoji : 'X'}</div>
        </Link>
        <div>
          <div>
            <Link href={postUrl}>{title}</Link>
          </div>
          {category && (
            <p className="post-category">
              {category.map((cat, index) => (
                <span key={index}>{cat}</span>
              ))}
            </p>
          )}
          <div>
            <time dateTime={dateTimeAttr}>{formattedDate}</time>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        <article className="post post-full">
          <header className="post-header inner-sm">
            <h1 className="post-title line-top">{post.title}</h1>
            <div className="post-subtitle">
              <span>{post.category ? post.category.map((cat, index) => <label key={index}>{cat}</label>) : ''}</span>
              <span className="post-date">{date}</span>
            </div>
          </header>
          {content ? (
            content.map((item) => (
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
                {item.type === 'video' ? (
                  <div className="video-wrap">
                    <video src={item.block.video.file.url} controls></video>
                  </div>
                ) : (
                  ''
                )}
                {item.type === 'bulleted_list_item' ? <li>{item.block.bulleted_list_item.text[0].plain_text}</li> : ''}
                {item.type === 'numbered_list_item' ? <li>{item.block.numbered_list_item.text[0].plain_text}</li> : ''}
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
                {item.type === 'code' ? (
                  <pre>
                    <code className={`language-${item.block.code.language}`}>{item.block.code.text[0].text.content}</code>
                  </pre>
                ) : (
                  ''
                )}
              </div>
            ))
          ) : (
            <div className="post-content inner-sm">
              <p className="heading-2">メンテナンス中...</p>
              <div className="mainte-image">
                <img src={withPrefix(mainteImage)} alt={mainteImage.replace(/images\//g, '')} />
              </div>
            </div>
          )}
          <article className="post-related">{relatedPosts.map((post) => renderRelatedPosts(post))}</article>
          <footer className="post-meta inner-sm back-btn">
            <span className="button" onClick={() => Router.back()}>
              一覧へ戻る
            </span>
          </footer>
        </article>
      </div>
    </Layout>
  );
};

export default Post;
