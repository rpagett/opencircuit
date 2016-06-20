import React from 'react';
import Formsy from 'formsy-react';
import fetch from 'isomorphic-fetch';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AuthActions from '../actions/AuthActions';
import { FormInput, SubmitButton } from './components';
import ProgressButton from '../components/helpers/ProgressButton';

class _RegistrationForm extends React.Component {
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

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //dispatchLogin: (user) => {
    //  dispatch(AuthActions.loginUser(user))
    //}
  }
}

const RegistrationForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(_RegistrationForm));
export default RegistrationForm;