import _ from 'lodash';

import { htmlToReact } from '../utils';
import ActionLink from './ActionLink';
import Action from './Action';

type PropsType = {
  config: {
    title: string;
    color_scheme: string;
    accent_color: string;
    favicon: string;
    domain: string;
  };
};

export const Footer = (props: PropsType): JSX.Element => {
  const config = _.get(props, 'config');
  const footer = _.get(config, 'footer');
  const copyright = _.get(footer, 'content');
  const links = _.get(footer, 'links');
  const hasSocial = _.get(footer, 'has_social');
  const socialLinks = _.get(footer, 'social_links');

  return (
    <footer id="colophon" className="site-footer outer">
      <div className="inner">
        <div className="site-footer-inside">
          <div className="site-info">
            {copyright && <span className="copyright">{htmlToReact(copyright)}</span>}
            {_.map(links, (action, index) => (
              <ActionLink key={index} action={action} />
            ))}
          </div>
          {hasSocial && !_.isEmpty(socialLinks) && (
            <div className="social-links">{_.map(socialLinks, (action, index: number) => (index === 0 ? <Action key={index} action={action} /> : ''))}</div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
