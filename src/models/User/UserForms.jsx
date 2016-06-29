import React from 'react';
import { ReduxForm, FormInput, PhoneInput, StateSelect, FormStatic } from '../../forms/components';

export class Edit extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="user_edit"
        fetchEndpoint={ `/api/users/${this.props.email}` }
        submitEndpoint={ `/api/users/${this.props.email}` }
        submitMethod="PATCH"
      >
        <FormStatic name="email" label="Email" />
        <FormInput name="first_name" label="First Name"/>
        <FormInput name="mi" label="Middle Initial" />
        <FormInput name="last_name" label="Last Name" />
        <PhoneInput name="phone" label="Phone" />
        <FormInput name="street" label="Street" />
        <FormInput name="address_2" label="Address 2" />
        <FormInput name="city" label="City" />
        <StateSelect name="state" label="State" />
        <FormInput name="zip" label="ZIP" />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          Save Changes
        </button>
      </ReduxForm>
    )
  }
}