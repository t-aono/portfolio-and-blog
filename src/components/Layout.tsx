import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import _ from 'lodash';

import { withPrefix, classNames } from '../utils';
import Header from './Header';
import Footer from './Footer';
import { GA_TRACKING_ID } from '../lib/gtag';

export default function Body(props) {
  useEffect(() => {
    handleVideoEmbeds();
  }, []);

  const handleVideoEmbeds = () => {
    const videoEmbeds = ['iframe[src*="youtube.com"]', 'iframe[src*="vimeo.com"]'];
    noframe(videoEmbeds.join(','), '.inner-sm');
  };

  const page = _.get(props, 'page');
  const pageTitle = _.get(page, 'title');
  const config = _.get(props, 'config');
  const configTitle = _.get(config, 'title');
  const colorScheme = _.get(config, 'color_scheme', 'light');
  const accentColor = _.get(config, 'accent_color', 'pink');
  const favicon = _.get(config, 'favicon');
  const domain = _.trim(_.get(config, 'domain', ''), '/');
  const seo = _.get(page, 'seo');
  const seoTitle = _.get(seo, 'title');
  const title = seoTitle ? seoTitle : [pageTitle, configTitle].join(' | ');
  const seoDescription = _.get(seo, 'description', '');
  const seoRobots = _.get(seo, 'robots', []).join(',');
  const seoExtra = _.get(seo, 'extra', []).map((meta, index) => {
    const keyName = _.get(meta, 'keyName', 'name');
    const name = _.get(meta, 'name');
    if (!name) {
      return null;
    }
    const nameAttr = { [keyName]: name };
    const relativeUrl = _.get(meta, 'relativeUrl');
    let value = _.get(meta, 'value');
    if (!value) {
      return null;
    }
    if (relativeUrl) {
      if (!domain) {
        return null;
      }
      value = domain + withPrefix(value);
    }
    return <meta key={index} {...nameAttr} content={value} />;
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google" content="notranslate" />
        <meta name="description" content={seoDescription} />
        {!_.isEmpty(seoRobots) && <meta name="robots" content={seoRobots} />}
        {seoExtra}
        <link href="https://fonts.googleapis.com/css?family=Karla:400,400i,700,700i&display=swap" rel="stylesheet" />
        {favicon && <link rel="icon" href={withPrefix(favicon)} />}
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `
          }}
        />
        <body className={classNames(`palette-${colorScheme}`, `accent-${accentColor}`)} />
      </Helmet>
      <div id="page" className="site">
        <Header page={page} config={config} />
        <main id="content" className="site-content">
          {props.children}
        </main>
        <Footer config={config} />
      </div>
    </>
  );
}
