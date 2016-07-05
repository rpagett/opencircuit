import React from 'react';

import { ReduxForm, FormInput, StateSelect, PhoneInput } from '../../forms/components';

export class RegistrationForm extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="auth_register"
        submitEndpoint={ `/auth/register` }
        submitMethod="POST"
      >
        <FormInput type="email" name="email" label="Email" />
        <FormInput type="password" name="password" label="Password" />
        <FormInput type="password" name="password_verify" label="Verify Password" />

        <hr />

        <FormInput name="first_name" label="First Name" />
        <FormInput name="mi" label="Middle Initial" />
        <FormInput name="last_name" label="Last Name" />
        <PhoneInput name="phone" label="Phone" />
        <FormInput name="street" label="Street" />
        <FormInput name="address_2" label="Address 2" />
        <FormInput name="city" label="City" />
        <StateSelect name="state" label="State" />
        <FormInput name="zip" label="ZIP" maxLength="5" />

        <button type="submit" className="btn btn-success btn-block">
          Register
        </button>
      </ReduxForm>
    );
  }
}

export class LoginForm extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="auth_login"
        submitEndpoint={ `/auth/login` }
        submitMethod="POST"
      >
        <FormInput type="email" name="email" label="Email" />
        <FormInput type="password" name="password" label="Password" />

        <button type="submit" className="btn btn-success btn-block">
          Log In
        </button>
      </ReduxForm>
    )
  }
}

export class PasswordRecovery extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="auth_recover"
        submitEndpoint={ `/auth/forgot` }
        submitMethod="POST"
      >
        <FormInput type="email" name="email" label="Email" />

        <button type="submit" className="btn btn-success btn-block">
          Send Recovery Code
        </button>
      </ReduxForm>
    )
  }
}