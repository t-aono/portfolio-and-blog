import _ from 'lodash';

import { FieldType } from '../types/components';

type FormType = {
  field: FieldType;
  onInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField = (props: FormType): JSX.Element => {
  const field = _.get(props, 'field');
  const inputType = _.get(field, 'input_type');
  const name = _.get(field, 'name');
  const defaultValue = _.get(field, 'default_value');
  const options = _.get(field, 'options');
  const required = _.get(field, 'is_required');
  const label = _.get(field, 'label');
  const labelId = `${name}-label`;
  const attr: {
    arial_labelledby?: string;
    required?: boolean;
  } = {};
  if (label) {
    attr['aria-labelledby'] = labelId;
  }
  if (required) {
    attr.required = true;
  }

  switch (inputType) {
    case 'checkbox':
      return (
        <div className="form-group form-checkbox">
          <input type="checkbox" id={name} name={name} {...attr} />
          {label && <label htmlFor={name}>{label}</label>}
        </div>
      );
    case 'radio':
      return (
        <div className="form-group form-radio">
          <input type="radio" id={label} name={name} value={label} />
          {label && <label htmlFor={label}>{label}</label>}
        </div>
      );
    case 'select':
      return (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <div className="form-select-wrap">
            <select id={name} name={name} {...attr}>
              {defaultValue && <option value="">{defaultValue}</option>}
              {_.map(options, (option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
    case 'textarea':
      return (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <textarea name={name} id={name} rows={5} {...(defaultValue ? { placeholder: defaultValue } : null)} {...attr} />
          <span className="animate-border" aria-hidden="true" />
        </div>
      );
    default:
      return (
        <div className="form-group">
          {label && <label htmlFor={name}>{label}</label>}
          <input type={inputType} name={name} id={name} {...(defaultValue ? { placeholder: defaultValue } : null)} {...attr} onChange={field.onInputChange} />
          <span className="animate-border" aria-hidden="true" />
        </div>
      );
  }
};

export default FormField;
