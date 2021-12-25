import React from 'react';
import _ from 'lodash';
import moment from 'moment-strftime';

import { Layout } from '../components/index';
import { classNames, getPageUrl, Link, withPrefix } from '../utils';
import FormField from '../components/FormField';

export default class Blog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['React', 'Next.js'],
      targetCategory: '',
      posts: props.posts,
    };
    this.setValue = this.setValue.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }
  
  setValue(e) {
    const index = this.state.categories.findIndex(category => category === e.target.value);
    this.state.targetCategory = this.state.categories[index];
  }

  onSubmit(e) {
    e.preventDefault();
    return false;
  }

  onInputChange = _.debounce(e => {
    e.preventDefault();
    
    if (e.target.value) this.searchPosts(e.target.value);
    else this.setState({ posts: this.props.posts })
  }, 1000)

  searchPosts(query) {
    fetch('/api/search', {
      body: JSON.stringify({
        query: query
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data)
      this.setState({posts: data})
    }).catch(error => {
      console.log(error);
    });
  }

  renderPost(post, index) {
    const title = _.get(post, 'title');
    const category = _.get(post, 'category');
    const emoji = _.get(post, 'emoji');
    // const excerpt = _.get(post, 'excerpt');
    const date = _.get(post, 'date');
    const dateTimeAttr = moment(date).strftime('%Y-%m-%d %H:%M');
    const formattedDate = moment(date).strftime('%Y/%m/%d');
    const postUrl = getPageUrl(post, { withPrefix: true });

    return (
      <article key={index} className="post grid-item">
        <div className="post-inside">
          <Link href={postUrl}>
            <div className='emoji-md'>{emoji ? emoji : 'X'}</div> 
          </Link>
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
    const pageNo = _.get(this.props, 'page_no');
    const title = _.get(page, 'title');
    const subtitle = _.get(page, 'subtitle');
    const hideTitle = _.get(page, 'hide_title');
    const colNumber = _.get(page, 'col_number', 'three');
    const postCount = _.get(this.props, 'post_count');
    const prev = (pageNo) ? parseInt(pageNo) - 1 : null;
    const next = (pageNo > 1) ? (pageNo * 12 < postCount) ? parseInt(pageNo) + 1 : null : 2;

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
          <form onSubmit={this.onSubmit} className='search-form'>
            <div className="categories">
              {this.state.categories.map(category => (
                <FormField onSetValue={this.setValue} key={category} field={{ input_type: "radio", name: 'category', label: category }}/>
              ))}
            </div>
            <FormField field={{ input_type: "text", name: "query", default_value: "Search ..." }} onInputChange={this.onInputChange} />
          </form>

          <div
            className={classNames('post-feed', 'grid', {
              'grid-col-2': colNumber === 'two',
              'grid-col-3': colNumber === 'three'
            })}
          >
            {this.state.posts.map((post, index) => this.renderPost(post, index))}
          </div>
        </div>
        <div className="pagenate-btn">
          {prev >= 1 && (
            <Link
              href={(prev === 1) ? '/blog' : `/blog/paginate/${prev}`}
              className="button"
            >前へ</Link>
          )}
          {next && <Link href={`/blog/paginate/${next}`} className="button">次へ</Link>}
        </div>
      </Layout>
    );
  }
}
