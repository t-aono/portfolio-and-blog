import _ from 'lodash';

import { Link, withPrefix } from '../utils';
import { AttrsType } from '../../types/components';

type PropsType = {
  action: {
    url: string;
    label: string;
    newWindow: string;
    noFollow: string;
  }
}

export const ActionLink: React.VFC<PropsType> = (props: PropsType) => {
  const action = _.get(props, 'action');
  const url = false; //_.get(action, 'url');
  const label = _.get(action, 'label');
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
    <Link href={withPrefix(url)} {...attrs}>
      {label}
    </Link>
  );
}

export default ActionLink;
