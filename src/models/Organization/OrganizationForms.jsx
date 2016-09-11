import React from 'react';

import { ReduxForm, FormInput, FormStatic, UserSelect, StateSelect } from '../../forms/components';
import { UserRoles, HasRole } from '../User/UserRoles';

export class Edit extends React.Component {
  render() {
    let fetch = { };

    if (this.props.creationForm) {
      fetch.submitEndpoint = `/api/organizations`;
      fetch.submitMethod = 'POST';
    }
    else {
      fetch.submitEndpoint = `/api/organizations/${this.props.slug}`;
      fetch.fetchEndpoint = `/api/organizations/${this.props.slug}`;
      fetch.submitMethod = 'PATCH';
    }

    return (
      <ReduxForm
        subStore="unit_edit"
        { ...fetch }
      >
        <FormStatic name="name" label="Name" />
        <FormInput name="street" label="Street" />
        <FormInput name="street_2" label="Address 2" />
        <FormInput name="city" label="City" />
        <StateSelect name="state" label="State" />
        <FormInput name="zip" label="ZIP" />

        <HasRole role={ UserRoles.Administrator }>
          <UserSelect name="director" label="Director" />
        </HasRole>

        <button name="submit" type="submit" className="btn btn-success btn-block">
          {( this.props.creationForm ? 'Create Organization' : 'Save Changes' )}
        </button>
      </ReduxForm>
    )
  }
}