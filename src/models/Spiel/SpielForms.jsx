import React from 'react';

import ModelView from '../../helpers/ModelView/ModelView';
import { ReduxForm, FormInput, FormStatic } from '../../forms/components';
import { UserRoles, HasRole } from '../User/UserRoles';

export class Edit extends React.Component {
  render() {
    let fetch = { };

    fetch.submitEndpoint = `/api/spiels/${this.props.slug}`;
    fetch.fetchEndpoint = `/api/spiels/${this.props.slug}`;
    fetch.submitMethod = 'PATCH';

    return (
      <ReduxForm
        subStore="spiel_edit"
        { ...fetch }
      >
        <FormStatic name="name" label="Name" />
        <FormStatic name="city" label="City" />
        <FormStatic name="state" label="State" />
        <FormInput name="unit_name" label="Custom Unit Name" />
        <FormInput name="show_title" label="Show Title" />
        <FormInput name="directors" label="Directors" />
        <FormInput name="age_outs" label="Age Outs and Graduates" />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          {( this.props.creationForm ? 'Create Unit' : 'Save Changes' )}
        </button>
      </ReduxForm>
    )
  }
}