import _ from 'lodash';

import Action from './Action';

export default function CtaButtons(props: string[]) {
  const actions: string[] = _.get(props, 'actions');
  return _.map(actions, (action, index) => <Action key={index} action={action} />);
}
