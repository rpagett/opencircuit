import React from 'react';
import { ValidatedForm, FormInput } from './components';

export default class LoginForm extends React.Component {
  submit(e) {
    // AJAX Login logic here
    console.log("We'll also do some validation.");
    console.log(e);
    e.preventDefault();
    return;
  }

  render() {
    return (
      <form
        onSubmit={ this.submit }
      >
        <FormInput
          name="email"
          label="Email Address"
          inputType="email"
          placeholder="Enter your email address."
          validations="isEmail"
          validationErrors={{
            isEmail: 'This doesn’t look like a valid email address.'
          }}
          defaultValue=""
          required=""
        />

        <FormInput
          name="password"
          label="Password"
          inputType="password"
          placeholder="Enter your password."
          defaultValue=""
          required=""
        />

        <div className="form-group row">
          <button className="btn btn-success btn-block" type="submit">
            Log In
          </button>
        </div>
      </form>
    );
  }
};