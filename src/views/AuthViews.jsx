import React from 'react';
import { Link } from 'react-router';
import Icon from '../helpers/Icon';
import LoginForm from '../forms/LoginForm';
import RegistrationForm from '../forms/RegistrationForm';

export class Login extends React.Component {
  render() {
    return (
      <div className="vcenter-parent col-xs-12 col-md-offset-2 col-md-8">
        <div className="card text-xs-center light-shadow">
          <div className="card-header" style={{ 'padding': '0rem' }}>
            <img className="card-img-top" src="/assets/img/NavbarLogo.png" />
            <div className="container-fluid card-info card-inverse auth-card">
              <strong className="h5">Log In</strong>
            </div>
          </div>

          <div className="card-block">
            <LoginForm />
          </div>

          <div className="card-footer">
            <div className="row">
              <div className="col-xs-12 col-sm-6 pull-xs-center">
                <Link to="/auth/register" className="btn btn-link">
                  <Icon shape="plus" /> Register Account
                </Link>
              </div>
              <div className="col-xs-12 col-sm-6 pull-xs-center">
                <Link to="/auth/recover" className="btn btn-link">
                  <Icon shape="question" /> Forgot Password
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
      <div className="vcenter-parent registration-box col-xs-12 col-md-offset-2 col-md-8">
        <div className="card text-xs-center light-shadow">
          <div className="card-header" style={{ 'padding': '0rem' }}>
            <img className="card-img-top" src="/assets/img/NavbarLogo.png" />
            <div className="container-fluid card-info card-inverse auth-card">
              <strong className="h5">Register an Account</strong>
            </div>
          </div>

          <div className="card-block">
            <RegistrationForm />
          </div>

          <div className="card-footer">
            <div className="row">

            </div>
          </div>
        </div>
      </div>
    );
  }
}