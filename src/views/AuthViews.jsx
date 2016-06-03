import React from 'react';
import { Link } from 'react-router';
import { Icon } from '../helpers/components';
import LoginForm from '../forms/LoginForm';

export class Login extends React.Component {
  render() {
    return (
      <div className="card text-xs-center light-shadow">
        <div className="card-header" style={{ 'padding': '0rem' }}>
          <img className="card-img-top" src="/assets/img/NavbarLogo.png" />
          <div className="container-fluid card-info card-inverse" style={{ 'padding': '.8rem' }}>
            <strong className="h5">Log In</strong>
          </div>
        </div>

        <div className="card-block">
          <LoginForm />
        </div>

        <div className="card-footer">
          <div className="row">
            <div className="col-sm-6">
              <Link to="/auth/register" className="btn btn-link">
                <Icon shape="plus" /> Register Account
              </Link>
            </div>
            <div className="col-sm-6">
              <Link to="/auth/recover" className="btn btn-link">
                <Icon shape="question" /> Forgot Password
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}