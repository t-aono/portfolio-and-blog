import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export default function Action(props) {
  const action = _.get(props, 'action');
  const url = _.get(action, 'url');
  const label = _.get(action, 'label');
  const style = _.get(action, 'style', 'link');
  const icon = _.get(action, 'icon', 'dribbble');
  const classes = classNames({
    button: style === 'button',
    'button-icon': style === 'icon'
  });
  const newWindow = _.get(action, 'new_window');
  const noFollow = _.get(action, 'no_follow');
  const attrs = {};
  if (newWindow) {
    attrs.target = '_blank';
  }
  if (newWindow || noFollow) {
    attrs.rel = [newWindow ? 'noopener' : '', noFollow ? 'nofollow' : ''].filter(Boolean).join(' ');
  }

  return (
    <Link href={withPrefix(url)} {...attrs} className={classes}>
      {style === 'icon' ? (
        <React.Fragment>
          <Icon icon={icon} />
          <span className="screen-reader-text">{label}</span>
        </React.Fragment>
      ) : action.icon === 'github' ? (
        <>
          <Icon icon="github" />　{label}
        </>
      ) : (
        label
      )}
    </Link>
  );
}