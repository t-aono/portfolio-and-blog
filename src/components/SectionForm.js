import React from 'react';
import _ from 'lodash';
import Router from 'next/router';
import Loader from "react-loader-spinner";

import { htmlToReact, markdownify } from '../utils';
import FormField from './FormField';

export default class SectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sending: false };
  }

  render() {
    const section = _.get(this.props, 'section');
    const sectionId = _.get(section, 'section_id');
    const title = _.get(section, 'title');
    const subtitle = _.get(section, 'subtitle');
    const content = _.get(section, 'content');
    const formId = _.get(section, 'form_id');
    const formFields = _.get(section, 'form_fields');
    const submitLabel = _.get(section, 'submit_label');
    const formHoneypotInputId = formId + '-honeypot';
    const formHoneypotLabelId = formId + '-honeypot-label';
    const formHoneypotName = formId + '-bot-field';
    const sending = this.state.sending;

    const sendForm = async event => {
      event.preventDefault();
      this.setState({ sending: true });

      const res = await fetch('/api/send', {
        body: JSON.stringify({
          name: event.target.name.value,
          email: event.target.email.value,
          subject: event.target.subject.value,
          message: event.target.message.value
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      if (res.ok) Router.push('/thank-you');
    }

    return (
      <section id={sectionId} className="block block-form outer">
        <div className="inner">
          {(title || subtitle) && (
            <div className="block-header inner-sm">
              {title && <h2 className="block-title line-top">{title}</h2>}
              {subtitle && <p className="block-subtitle">{htmlToReact(subtitle)}</p>}
            </div>
          )}
          <div className="block-content inner-sm">
            {content && markdownify(content)}
            <form
              onSubmit={sendForm}
              name={formId}
              id={formId}
              data-netlify="true"
              data-netlify-honeypot={formHoneypotName}
            >
              <div className="screen-reader-text">
                <label id={formHoneypotLabelId} htmlFor={formHoneypotInputId}>
                  Don't fill this out if you're human:
                  <input aria-labelledby={formHoneypotLabelId} id={formHoneypotInputId} name={formHoneypotName} />
                </label>
              </div>
              <input type="hidden" name="form-name" value={formId} />
              {_.map(formFields, (field, index) => <FormField key={index} {...this.props} field={field} />)}
              <div className="form-submit" style={{ display: (sending) ? 'none' : 'block' }}>
                <button type="submit" className="button">{submitLabel}</button>
              </div>
              <Loader style={{ display: (sending) ? 'block' : 'none' }} type="ThreeDots" color="#23d3ff" height={80} width={80}/>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
