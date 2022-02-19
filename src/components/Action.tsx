import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';
import { AttrsType } from '../types/components';
import { ActionType } from '../types/components';

export const Action = (props: ActionType) => {
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
  const attrs: AttrsType = {};
  if (newWindow) {
    attrs.target = '_blank';
  }
  if (newWindow || noFollow) {
    attrs.rel = [newWindow ? 'noopener' : '', noFollow ? 'nofollow' : ''].filter(Boolean).join(' ');
  }

  return (
    <Link href={withPrefix(url)} {...attrs} className={classes}>
      {style === 'icon' ? (
        <>
          <Icon icon={icon} />
          <span className="screen-reader-text">{label}</span>
        </>
      ) : action.icon === 'github' ? (
        <>
          <Icon icon="github" />　{label}
        </>
      ) : (
        label
      )}
    </Link>
  );
};

export default Action;
