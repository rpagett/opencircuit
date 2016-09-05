import React from 'react';
import { ReduxForm, FormInput, UnitTypeSelect } from '../../forms/components';

export class Edit extends React.Component {
  render() {
    let fetch = { };

    if (this.props.creationForm) {
      fetch.submitEndpoint = `/api/compclasses`;
      fetch.submitMethod = 'POST';
    }
    else {
      fetch.submitEndpoint = `/api/compclasses/${this.props.abbreviation}`;
      fetch.fetchEndpoint = `/api/compclasses/${this.props.abbreviation}`;
      fetch.submitMethod = 'PATCH';
    }

    return (
      <ReduxForm
        subStore="compclass_edit"
        { ...fetch }
      >
        <FormInput name="name" label="Name" />
        <FormInput name="abbreviation" label="Abbreviation" />

        {( this.props.creationForm ?
          <UnitTypeSelect name="unit_type" label="Unit Type" /> : null
        )}

        <button name="submit" type="submit" className="btn btn-success btn-block">
          {( this.props.creationForm ? 'Create Competitive Class' : 'Save Changes' )}
        </button>
      </ReduxForm>
    )
  }
}