import React from 'react';
import { Link } from 'react-router';
import Icon from '../../helpers/Icon';
import { LoginForm, RegistrationForm, PasswordRecovery, ProcessPasswordRecovery } from './AuthForms';

export class Login extends React.Component {
  render() {
    return (
      <div className="vcenter-parent col-xs-12 offset-md-2 col-md-8">
        <div className="card text-xs-center light-shadow">
          <div className="card-header" style={{ 'padding': '0rem' }}>
            <img className="card-img-top" src="/assets/img/2016NavbarLogo.png" />
            <div className="container-fluid card-info card-inverse auth-card">
              <strong className="h5">Log In</strong>
            </div>
          </div>

          <div className="card-block">
            <div className="alert alert-warning">
              If this is your first time logging into the new OpenCircuit, good news! Your account is
              still around. Unfortunately, you'll need to reset your password. Click <strong>Recover
              Password</strong> below to proceed.
            </div>
            <LoginForm />
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-xs-12 col-sm-6 pull-xs-center">
                <Link to="/auth/register" className="btn btn-link">
                  <Icon shape="plus" />Register Account
                </Link>
              </div>
              <div className="col-xs-12 col-sm-6 pull-xs-center">
                <Link to="/auth/recover" className="btn btn-link">
                  <Icon shape="question" />Recover Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Register extends React.Component {
  render() {
    return (
      <div className="vcenter-parent registration-box col-xs-12 offset-md-2 col-md-8">
        <div className="card text-xs-center light-shadow">
          <div className="card-header" style={{ 'padding': '0rem' }}>
            <img className="card-img-top" src="/assets/img/2016NavbarLogo.png" />
            <div className="container-fluid card-info card-inverse auth-card">
              <strong className="h5">Register an Account</strong>
            </div>
          </div>

          <div className="card-block">
            <RegistrationForm />
          </div>

          <div className="card-footer">
            <center>Already have an account? <Link to="/auth/login" className="btn btn-link">Log In.</Link></center>
          </div>
        </div>
      </div>
    );
  }
}

export class Recover extends React.Component {
  render() {
    return (
      <div className="vcenter-parent registration-box col-xs-12 offset-md-2 col-md-8">
        <div className="card text-xs-center light-shadow">
          <div className="card-header" style={{ 'padding': '0rem' }}>
            <img className="card-img-top" src="/assets/img/2016NavbarLogo.png" />
            <div className="container-fluid card-info card-inverse auth-card">
              <strong className="h5">Recover Password</strong>
            </div>
          </div>

          <div className="card-block">
            <PasswordRecovery />
          </div>
        </div>
      </div>
    );
  }
}

export class ProcessRecovery extends React.Component {
  render() {
    return (
      <div className="vcenter-parent registration-box col-xs-12 offset-md-2 col-md-8">
        <div className="card text-xs-center light-shadow">
          <div className="card-header" style={{ 'padding': '0rem' }}>
            <img className="card-img-top" src="/assets/img/2016NavbarLogo.png" />
            <div className="container-fluid card-info card-inverse auth-card">
              <strong className="h5">Recover Password</strong>
            </div>
          </div>

          <div className="card-block">
            <ProcessPasswordRecovery token={ this.props.params.token } />
          </div>
        </div>
      </div>
    );
  }
}

export class MustConfirm extends React.Component {
  render() {
    return (
      <div className="offset-xs-1 col-xs-10">
        <div className="content-container">
          <p className="lead">You have not yet confirmed your membership.</p>

          <p>Check your email for a confirmation link.</p>
        </div>
      </div>
    )
  }
}

export class PostRegister extends React.Component {
  render() {
    return (
      <div className="offset-xs-1 col-xs-10">
        <div className="content-container">
          <p className="lead">Your registration is processing.</p>

          <p>Check your email for a link to confirm your new membership.</p>
        </div>
      </div>
    )
  }
}

export class PostRecovery extends React.Component {
  render() {
    return (
      <div className="offset-xs-1 col-xs-10">
        <div className="content-container">
          <p className="lead">Check your email!</p>

          <p>There will be instructions there to process your password recovery.</p>
        </div>
      </div>
    )
  }
}