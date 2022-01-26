import _ from 'lodash';

import Action from './Action';
import { ActionType } from '../types/components';

export const CtaButtons = (props: ActionType) => {
  const actions = _.get(props, 'actions');
  return _.map(actions, (action, index) => <Action key={index} action={action} />);
};

export default CtaButtons;
