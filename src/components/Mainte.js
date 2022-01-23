import Router from 'next/router';

import { Layout } from './index';
import { withPrefix } from '../utils';

export default function Mainte(props) {
  const construction = '/images/construction_simple.png';
  return (
    <Layout page={props.page} config={props.config}>
      <div className="inner outer">
        <article className="post post-full">
          <span className="button" onClick={() => Router.back()}>
            一覧へ戻る
          </span>
          <div className="post-content in ner-sm">
            <p className="heading-2">メンテナンス中...</p>
          </div>
          <div className="mainte-image">
            <img src={withPrefix(construction)} alt={construction.replace(/images\//g, '')} />
          </div>
        </article>
      </div>
    </Layout>
  );
}
