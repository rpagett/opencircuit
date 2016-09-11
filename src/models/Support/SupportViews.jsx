import React from 'react';

import { ReduxForm, FormInput, TextArea } from '../../forms/components';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Need Help?</h1>

        <p>Use this form to submit questions and feedback about the OpenCircuit service. If you have questions
          about circuit rules or procedures not related to this website, contact <a href="mailto:secretary@cwea.us">secretary@cwea.us</a>.</p>

        <p></p>

        <ReduxForm
          subStore="support"
          submitEndpoint="/api/support"
          submitMethod="POST"
        >
          <FormInput name="subject" label="Subject" />
          <TextArea name="details" label="Details of Problem/Question" />

          <button role="submit" type="submit" name="submit" className="btn btn-success btn-block">
            Send
          </button>
        </ReduxForm>
      </div>
    )
  }
}

export class Success extends React.Component {
  render() {
    return (
      <div>
        <p className="lead">Thank you!</p>

        <p></p>

        <p>You should expect a response by email within 24 hours.</p>
      </div>
    )
  }
}