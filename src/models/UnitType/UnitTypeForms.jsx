import React from 'react';
import { ReduxForm, FormInput } from '../../forms/components';

export class Edit extends React.Component {
  render() {
    let fetch = { };

    if (this.props.creationForm) {
      fetch.submitEndpoint = `/api/unittypes`;
      fetch.submitMethod = 'POST';
    }
    else {
      fetch.submitEndpoint = `/api/unittypes/${this.props.slug}`;
      fetch.fetchEndpoint = `/api/unittypes/${this.props.slug}`;
      fetch.submitMethod = 'PATCH';
    }

    return (
      <ReduxForm
        subStore="unittype_edit"
        { ...fetch }
      >
        <FormInput name="name" label="Name" />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          {( this.props.creationForm ? 'Create Unit Type' : 'Save Changes' )}
        </button>
      </ReduxForm>
    )
  }
}