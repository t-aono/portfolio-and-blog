import _ from 'lodash';

import Action from './Action';

export default function CtaButtons(props) {
  const actions = _.get(props, 'actions');
  return _.map(actions, (action, index) => <Action key={index} action={action} />);
}
