import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { classNames, getPageUrl, Link, withPrefix } from '../utils';
import FormField from '../components/FormField';

export default function Blog(props) {
  const renderPost = (post, index) => {
    const title = _.get(post, 'title');
    const category = _.get(post, 'category');
    const emoji = _.get(post, 'emoji');
    // const excerpt = _.get(post, 'excerpt');
    const date = _.get(post, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate = moment(date).strftime('%Y/%m/%d');
    const postUrl = getPageUrl(post, { withPrefix: true });
    // const [isLoading, setIsLoading] = useState(false);
    const setIsLoading = () => {
      post.isLoading = true;
    };

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          <Link href={postUrl} onClick={() => setIsLoading(true)}>
            <div className="emoji-md">
              {post.isLoading ? <img src={withPrefix(loadingImage)} alt={loadingImage.replace(/images\//g, '')} /> : emoji ? emoji : 'X'}
            </div>
          </Link>
          <header className="post-header">
            <h2 className="post-title">
              <Link href={postUrl} onClick={() => setIsLoading(true)}>
                {title}
              </Link>
            </h2>
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
          </header>
          {/* {excerpt && <p className="post-content">{excerpt}</p>} */}
        </div>
      </article>
    );
  };

  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  const pageNo = _.get(props, 'page_no');
  const title = _.get(page, 'title');
  const subtitle = _.get(page, 'subtitle');
  const hideTitle = _.get(page, 'hide_title');
  const colNumber = _.get(page, 'col_number', 'three');
  const postCount = _.get(props, 'post_count');
  const prev = pageNo ? parseInt(pageNo) - 1 : null;
  const next = pageNo > 1 ? (pageNo * 12 < postCount ? parseInt(pageNo) + 1 : null) : 2;
  const noHit = '/images/cat_02_simple.png';
  const loadingImage = '/images/svg-loader-spinning-circles.svg';
  const categories = props.categories;
  const [posts, setPosts] = useState(props.posts);
  const [isSearched, setIsSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  const setValue = (e) => {
    const index = categories.findIndex((category) => category === e.target.value);
    if (categories[index]) {
      searchPosts({ category: categories[index] });
    } else {
      setPosts(posts);
      setIsSearched(false);
    }
    document.getElementById('query').value = '';
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  const onInputChange = _.debounce((e) => {
    e.preventDefault();

    if (e.target.value) {
      searchPosts({ title: e.target.value });
    } else {
      setPosts(posts);
      setIsSearched(false);
    }
    // カテゴリー選択を解除
    for (let elem of document.getElementsByTagName('input')) {
      if (elem.checked) elem.checked = false;
    }
  }, 1000);

  const searchPosts = (query) => {
    setIsSearching(true);
    fetch('/api/search/', {
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setIsSearched(true);
        setIsSearching(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <form onSubmit={onSubmit} className="search-form">
          <div className="categories">
            {categories.map((category) => (
              <FormField onSetValue={setValue} key={category} field={{ input_type: 'radio', name: 'category', label: category }} />
            ))}
          </div>
          <FormField field={{ input_type: 'text', name: 'query', default_value: 'Search ...' }} onInputChange={onInputChange} />
        </form>

        {isSearching ? (
          <div className="loading-image">
            <img src={withPrefix(loadingImage)} alt={loadingImage.replace(/images\//g, '')} />
          </div>
        ) : (
          <>
            <div
              className={classNames('post-feed', 'grid', {
                'grid-col-2': colNumber === 'two',
                'grid-col-3': colNumber === 'three'
              })}
            >
              {posts.length > 0 ? (
                posts.map((post, index) => renderPost(post, index))
              ) : (
                <div className="no-hit">
                  <div>記事がありません！</div>
                  <img src={withPrefix(noHit)} alt={noHit.replace(/images\//g, '')} />
                </div>
              )}
            </div>
            {isSearched ? (
              ''
            ) : (
              <div className="paginate-btn">
                {prev >= 1 && (
                  <Link href={prev === 1 ? '/blog' : `/blog/paginate/${prev}`} className="button">
                    前へ
                  </Link>
                )}
                {next && (
                  <Link href={`/blog/paginate/${next}`} className="button">
                    次へ
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}
