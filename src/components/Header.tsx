import { useEffect, useRef } from 'react';
import Router from 'next/router';
import _ from 'lodash';

import { Link, withPrefix, classNames, getPageUrl } from '../utils';
import Action from './Action';

type PropsType = {
  page: {
    title: string;
    seo: {
      title: string;
      description: string;
      robots: string[];
      extra: string[];
    };
  };
  config: {
    title: string;
    color_scheme: string;
    accent_color: string;
    favicon: string;
    domain: string;
  };
};

export const Header = (props: PropsType): JSX.Element => {
  const menuOpenRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize, true);
    Router.events.on('routeChangeStart', handleRouteChange);
  }, [Router]);

  const handleWindowResize = () => {
    const menuOpenElm = _.get(menuOpenRef, 'current.offsetParent');
    if (menuOpenElm === null) {
      document.body.classList.remove('menu--opened');
    }
  };

  const handleRouteChange = () => {
    document.body.classList.remove('menu--opened');
  };

  const handleMenuToggle = (event) => {
    event.preventDefault();
    document.body.classList.toggle('menu--opened');
  };

  const renderNavLinks = (navLinks, pageUrl) => {
    return (
      <>
        <button id="menu-open" className="menu-toggle" ref={menuOpenRef} onClick={handleMenuToggle.bind(this)}>
          <span className="screen-reader-text">Open Menu</span>
          <span className="icon-menu" aria-hidden="true" />
        </button>
        <nav id="main-navigation" className="site-navigation" aria-label="Main Navigation">
          <div className="site-nav-inside">
            <button id="menu-close" className="menu-toggle" onClick={handleMenuToggle.bind(this)}>
              <span className="screen-reader-text">Close Menu</span>
              <span className="icon-close" aria-hidden="true" />
            </button>
            <ul className="menu">
              {_.map(navLinks, (action, index) => {
                const actionUrl = _.trim(_.get(action, 'url'), '/');
                const actionStyle = _.get(action, 'style', 'link');
                pageUrl = pageUrl.replace(/\/paginate\/\d+/, '');
                return (
                  <li
                    key={index}
                    className={classNames('menu-item', {
                      'current-menu-item': pageUrl === actionUrl,
                      'menu-button': actionStyle !== 'link'
                    })}
                  >
                    <Action action={action} />
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </>
    );
  };

  const page = _.get(props, 'page');
  const pageUrl = _.trim(getPageUrl(page), '/');
  const config = _.get(props, 'config');
  const header = _.get(config, 'header');
  const logo = _.get(header, 'logo_img');
  const logoAlt = _.get(header, 'logo_img_alt', '');
  const title = _.get(header, 'title');
  const hasNav = _.get(header, 'has_nav');
  const navLinks = _.get(header, 'nav_links');

  return (
    <header id="masthead" className="site-header outer">
      <div className="inner">
        <div className="site-header-inside">
          <div className="site-branding">
            {logo ? (
              <p className="site-logo">
                <Link href={withPrefix('/')}>
                  <img src={withPrefix(logo)} alt={logoAlt} />
                </Link>
              </p>
            ) : (
              <p className="site-title">
                <Link href={withPrefix('/')}>{title}</Link>
              </p>
            )}
          </div>
          {hasNav && !_.isEmpty(navLinks) && renderNavLinks(navLinks, pageUrl)}
        </div>
      </div>
    </header>
  );
};

export default Header;
