import _ from 'lodash';

import Action from './Action';
import { ActionType } from '../types/components';

type PropsType = {
  actions: ActionType;
};

export const CtaButtons = (props: PropsType) => {
  const actions = _.get(props, 'actions');
  return (
    <>
      {_.map(actions, (action, index) => (
        <Action key={index} action={action} />
      ))}
    </>
  );
};

export default CtaButtons;
