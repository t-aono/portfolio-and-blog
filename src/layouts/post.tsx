import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Prism from 'prismjs';
import Router from 'next/router';

import { Layout, Fixing } from '../components/index';
import { Link, getPageUrl } from '../utils';
import { PostType, ConfigType, PageType, ContentType } from '../types/layouts';

type PropsType = {
  post: PostType;
  content: ContentType[];
  heading?: { content: string; child: { content: string } }[];
  data: { config: ConfigType };
  page: PageType;
};

const Post = (props: PropsType) => {
  const post = _.get(props, 'post');
  const title = _.get(post, 'title');
  const category = _.get(post, 'category');
  const emoji = _.get(post, 'emoji');
  const content = _.get(props, 'content');
  const heading = _.get(props, 'heading');
  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  const date = post.date ? post.date.replace(/\-/g, '/') : '';

  const [relatedPosts, setRelatedPosts] = useState<PostType[]>([]);

  useEffect(() => {
    Prism.highlightAll();

    const relatedCount = 3;
    if (post.category) {
      fetch('/api/search/', {
        body: JSON.stringify({ category: post.category[0], count: relatedCount }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRelatedPosts(data.filter((p) => p.pageId !== post.pageId).slice(0, relatedCount));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const renderRelatedPosts = (post: PostType) => {
    const title = _.get(post, 'title');
    const date = post.date ? post.date.replace(/\-/g, '/') : '';
    const category = _.get(post, 'category');
    const emoji = _.get(post, 'emoji');
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
          <div className="related-sub-text">
            {category && (
              <p className="post-category">
                {category.map((cat, index) => (
                  <span key={index}>{cat}</span>
                ))}
              </p>
            )}
            <p>{date}</p>
          </div>
        </div>
      </div>
    );
  };

  if (!content) {
    return <Fixing page={page} config={config} />;
  }

  return (
    <Layout page={page} config={config}>
      <div className="inner outer">
        <article className="post post-full">
          <header className="post-header inner-sm">
            <div className="emoji-lg">{emoji ? emoji : ''}</div>
            <h1 className="post-title line-top">{title}</h1>
            <div className="post-subtitle">
              <span>{category ? category.map((cat, index) => <label key={index}>{cat}</label>) : ''}</span>
            </div>
            <div className="post-date">
              <span>{date}</span>
            </div>
          </header>
          {heading ? (
            <>
              <hr />
              <section className="table-of-contents inner-sm">
                <legend>目次</legend>
                {heading.map((item) => (
                  <div key={item.content}>
                    <div className="heading-big">{item.content}</div>
                    {item.child ? <div className="heading-small">{item.child.content}</div> : ''}
                  </div>
                ))}
              </section>
              <hr />
            </>
          ) : (
            ''
          )}
          {content.map((item) => (
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
          ))}
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
