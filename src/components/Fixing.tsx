import Router from 'next/router';

import { Layout } from './index';
import { withPrefix } from '../utils';
import { PageType } from '../types/components';
import { ConfigType } from '../types/components';

type PropsType = PageType & ConfigType;

export const Fixing: React.VFC<PropsType> = (props) => {
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
          <div className="fixing-image">
            <img src={withPrefix(construction)} alt={construction.replace(/images\//g, '')} />
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default Fixing;
