import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';
import Loader from 'react-loader-spinner';

import { Layout } from '../components/index';
import { classNames, getPageUrl, Link, withPrefix } from '../utils';
import FormField from '../components/FormField';
import { ConfigType, PageType, PostType } from '../types/layouts';

type BlogType = {
  data: { config: ConfigType };
  page: PageType;
  page_no: number;
  categories: [];
  posts: PostType[];
  post_count: number;
};

export const Blog = (props: BlogType): JSX.Element => {
  const data = _.get(props, 'data');
  const config = _.get(data, 'config');
  const page = _.get(props, 'page');
  const pageNo = _.get(props, 'page_no');
  const title = _.get(page, 'title');
  const subtitle = _.get(page, 'subtitle');
  const hideTitle = _.get(page, 'hide_title');
  const colNumber = _.get(page, 'col_number', 'three');
  const postCount = _.get(props, 'post_count');
  const prev = pageNo ? pageNo - 1 : null;
  const next = pageNo > 1 ? (pageNo * 12 < postCount ? pageNo + 1 : null) : 2;
  const noHit = '/images/cat_02_simple.png';
  const categories = props.categories;
  const [currentCategory, setCurrentCategory] = useState('');
  const originalPosts = props.posts;
  const [posts, setPosts] = useState(originalPosts);
  const [isSearched, setIsSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState([...Array(posts.length)].map(() => false));

  useEffect(() => {
    setPosts(originalPosts);
  }, [originalPosts]);

  const setValue = (e) => {
    console.log(e);

    const index = categories.findIndex((category) => category === e.target.value);
    if (categories[index]) {
      if (currentCategory === categories[index]) {
        setPosts(originalPosts);
        clearCategorySelect();
      } else {
        searchPosts({ category: categories[index] });
        setCurrentCategory(categories[index]);
      }
    } else {
      setPosts(posts);
      setIsSearched(false);
    }
    const query: HTMLInputElement = document.getElementById('query') as HTMLInputElement;
    query.value = '';
  };

  const onInputChange = _.debounce((e: React.ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    if (e.target.value) {
      searchPosts({ title: e.target.value });
    } else {
      setPosts(originalPosts);
      setIsSearched(false);
    }
    clearCategorySelect();
  }, 1000);

  const clearCategorySelect = () => {
    // カテゴリー選択を解除
    const elements: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName('input') as HTMLCollectionOf<HTMLInputElement>;
    for (let elem of elements) {
      if (elem.checked) elem.checked = false;
    }
    setIsSearched(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  const setPageLoading = (index) => {
    setIsLoading(isLoading.map((_, i) => (i === index ? true : false)));
  };

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

  const renderPost = (post: PostType, index: number) => {
    const title = _.get(post, 'title');
    const category = _.get(post, 'category');
    const emoji = _.get(post, 'emoji');
    // const excerpt = _.get(post, 'excerpt');
    const date = _.get(post, 'date');
    const dateTimeAttr: string = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate: string = moment(date).strftime('%Y/%m/%d');
    const postUrl: string = getPageUrl(post, { withPrefix: true });

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          <Link href={postUrl} onClick={() => setPageLoading(index)}>
            {isLoading[index] ? (
              <div className="post-loader">
                <Loader type="MutatingDots" color="#23d3ff" height={80} width={80} />
              </div>
            ) : (
              <div className="emoji-md">{emoji ? emoji : 'X'}</div>
            )}
          </Link>
          <header className="post-header">
            <h2 className="post-title">
              <Link href={postUrl} onClick={() => setPageLoading(index)}>
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
              <FormField key={category} field={{ input_type: 'radio', name: 'category', label: category }} />
            ))}
          </div>
          <FormField field={{ input_type: 'text', name: 'query', default_value: 'Search ...' }} onInputChange={onInputChange} />
        </form>

        {isSearching ? (
          <div className="search-loader">
            <Loader type="MutatingDots" color="#23d3ff" height={80} width={80} />
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
};

export default Blog;
