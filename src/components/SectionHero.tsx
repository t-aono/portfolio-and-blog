import _ from 'lodash';

import { markdownify } from '../utils';
import CtaButtons from './CtaButtons';
import { ActionType } from '../types/components';

type PropsType = {
  section: {
    section_id: string;
    title: string;
    content: string;
    actions: ActionType;
  };
};

export const SectionHero = (props: PropsType) => {
  const section = _.get(props, 'section');
  const sectionId = _.get(section, 'section_id');
  const title = _.get(section, 'title');
  const content = _.get(section, 'content');
  const actions = _.get(section, 'actions');

  return (
    <section id={sectionId} className="block block-hero outer">
      <div className="inner">
        {title && (
          <div className="block-header inner-sm">
            <h1 className="block-title">{title}</h1>
          </div>
        )}
        {content && <div className="block-content inner-sm row-md">{markdownify(content)}</div>}
        {actions && (
          <div className="block-buttons inner-sm">
            <CtaButtons actions={actions} />
          </div>
        )}
      </div>
    </section>
  );
};

export default SectionHero;
