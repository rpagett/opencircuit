import React from 'react';
import Formsy from 'formsy-react';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from './AuthActions';
import { FormInput, StateSelect, PhoneInput } from '../../forms/components';
import ProgressButton from '../../helpers/ProgressButton';
import { fetchAPI } from '../../helpers/functions';

class _RegistrationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      canSubmit: false,
      buttonState: 'error'
    }
  }

  submit(data, reset, errors) {
    console.log(data);

    this.setState({ buttonState: 'loading' });
    fetchAPI('/auth/register', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then( response => {
        return response.json();
      })
      .then( res => {
        if (res.success == false) {
          this.setState({buttonState: 'error'});
          if (res.cause == 'validation') {
            return errors(res.messages);
          }
          else {
            return errors({
              email: res.message.message
            });
          }
        }
        else if (res.success == true) {
          this.setState({ buttonState: 'success' });
          this.props.dispatchLogin(res.user);
          this.props.router.push('/');
        }
        console.log(res);
      });

    return;
  }

  enableButton() {
    this.setState({ buttonState: '' });
  }

  disableButton() {
    this.setState({ buttonState: 'error' });
  }

  render() {
    return (
      <Formsy.Form
        onValidSubmit={ this.submit.bind(this) }
        onValid={ this.enableButton.bind(this) }
        onInvalid={ this.disableButton.bind(this) }
        //noValidate="true"
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
          required
        />

        <FormInput
          name="password"
          label="Password"
          inputType="password"
          placeholder="Enter your desired password."
          validationHook="change"
          required
        />

        <FormInput
          name="password_verify"
          label="Verify Password"
          inputType="password"
          placeholder="Enter your password again."
          validations="equalsField:password"
          validationErrors={{
            equalsField: 'Your passwords must match.'
          }}
          required
        />

        <hr />

        <FormInput
          name="first_name"
          label="First Name"
          inputType="text"
          validationHook="change"
          validations="isExisty"
          required
        />

        <FormInput
          name="mi"
          label="Middle Initial (opt.)"
          inputType="text"
          maxLength="1"
          afterInput="."
          validationHook="change"
          validations="isAlpha"
          validationError="The initial must be a letter."
        />

        <FormInput
          name="last_name"
          label="Last Name"
          inputType="text"
          validationHook="change"
          validations="isExisty"
          required
        />

        <PhoneInput
          name="phone"
          label="Phone"
          beforeInput="+1"
        />

        <FormInput
          name="street"
          label="Street"
          inputType="text"
          validationHook="change"
          validations="isExisty"
          required
        />

        <FormInput
          name="address_2"
          label="Address 2 (opt.)"
          inputType="text"
        />

        <FormInput
          name="city"
          label="City"
          inputType="text"
          validationHook="change"
          validations="isExisty"
          required
        />

        <StateSelect
          name="state"
          label="State"
          required
        />

        <FormInput
          name="zip"
          label="ZIP"
          inputType="text"
          validationHook="change"
          validations={{
            isExisty: true,
            isNumeric: true,
          }}
          maxLength="5"
          required
        />

        <div className="form-group row">
          <ProgressButton
            type="submit"
            ref="submit"
            state={ this.state.buttonState }
          >
            Register
          </ProgressButton>
        </div>
      </Formsy.Form>
    );
  }
};

const mapStateToRegistrationProps = (state, ownProps) => {
  return { }
}

const mapDispatchToRegistrationProps = (dispatch) => {
  return {
    dispatchLogin: (user) => {
      dispatch(AuthActions.loginUser(user))
    }
  }
}

export const RegistrationForm = withRouter(connect(mapStateToRegistrationProps, mapDispatchToRegistrationProps)(_RegistrationForm));

class _LoginForm extends React.Component {
  constructor() {
    super();

    this.state = {
      canSubmit: false,
      buttonState: 'error'
    }
  }

  submit(data, reset, errors) {
    console.log("We'll also do some validation.");
    console.log(data);

    this.setState({ buttonState: 'loading' });
    fetch('/auth/login', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    })
      .then( response => {
        return response.json();
      })
      .then( res => {
        if (res.success == false) {
          this.setState({ buttonState: 'error' });
          return errors({
            password: res.message
          });
        }
        else if (res.success == true) {
          this.setState({ buttonState: 'success' });
          this.props.dispatchLogin(res.user);
          this.props.router.push('/');
        }
        console.log(res);
      });

    return;
  }

  render() {
    return (
      <Formsy.Form
        onValidSubmit={ this.submit.bind(this) }
        onValid={ () => {
          this.setState({ buttonState: '' });
        }}
        onInvalid={ () => {
          this.setState({ buttonState: 'error' });
        }}
        noValidate="true"
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
          //defaultValue=""
          required
        />

        <FormInput
          name="password"
          label="Password"
          inputType="password"
          placeholder="Enter your password."
          validationHook="change"
          //defaultValue=""
          required
        />

        <div className="form-group row">
          <ProgressButton
            type="submit"
            ref="submit"
            state={ this.state.buttonState }
          >
            Log In
          </ProgressButton>
        </div>
      </Formsy.Form>
    );
  }
};

const mapStateToLoginProps = (state, ownProps) => {
  return { }
}

const mapDispatchToLoginProps = (dispatch) => {
  return {
    dispatchLogin: (user) => {
      dispatch(AuthActions.loginUser(user))
    }
  }
}

export const LoginForm = withRouter(connect(mapStateToLoginProps, mapDispatchToLoginProps)(_LoginForm));