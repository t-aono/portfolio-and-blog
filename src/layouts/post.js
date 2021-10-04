import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import Prism from 'prismjs';
import Router from 'next/router';

import { Layout } from '../components/index';
import { htmlToReact, withPrefix, markdownify, Link } from '../utils';

export default class Post extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    const post = _.get(this.props, 'post');
    const content = _.get(this.props, 'content');
    const data = _.get(this.props, 'data');
    const config = _.get(data, 'config');
    const page = _.get(this.props, 'page');
    const date = _.get(page, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate = moment(date).strftime('%A, %B %e, %Y');

    const onClickBack = (e) => {
      e.preventDefault();
      Router.back();
    }

    return (
      <Layout page={page} config={config}>
        <div className="inner outer">
          <article className="post post-full">
            <header className="post-header inner-sm">
              <h1 className="post-title line-top">{post.title}</h1>
              <div className="post-subtitle">
                <span>{post.category.map(cat => <label key={cat}>{cat}</label>)}</span>
                <span className="post-date">{post.date}</span>
              </div>
            </header>
            {content.map(item => (
              <div className="post-content inner-sm" key={item.block.id}>
  {/* {item.type === 'code' && console.log(item.block.code.language)} */}
                {(item.type === 'heading_2') ? <p className="heading-2">{item.block.heading_2.text[0].text.content}</p> : ''}
                {(item.type === 'heading_3') ? <p className="heading-3">{item.block.heading_3.text[0].text.content}</p> : ''}
                {(item.type === 'image') ? <div className="capture-wrap"><img src={item.block.image.file.url} className="capture-image" /></div> : ''}
                {(item.type === 'bulleted_list_item') ? <li>{item.block.bulleted_list_item.text[0].plain_text}</li> : ''}
                {(item.type === 'paragraph') ? (
                  <div>
                    {(item.block.paragraph.text.length > 0) ? (
                      item.block.paragraph.text.map(text => (text.href) ? (
                        <Link href={text.href} target="_blank" key={text.id}>{text.plain_text}</Link>
                      ) : <span key={text.id}>{text.plain_text}</span>)
                    ) : "　"}
                  </div>
                ) : ''}
                {(item.type === 'code') ? (
                  <pre className="line-numbers">
                    <code className={`language-${item.block.code.language}`}>{item.block.code.text[0].text.content}</code>
                  </pre>
                ) : ''}
              </div>
            ))}
            <footer className="post-meta inner-sm back-btn">
              <button className="button" onClick={onClickBack}>戻る</button>
            </footer>
          </article>
        </div>
      </Layout>
    );
  }
}
