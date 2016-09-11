import React from 'react';
import { Link } from 'react-router';

import ModelView from '../../helpers/ModelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserOrAdmin } from './UserRoles';
import { ProfileGravatar } from '../../helpers/gravatars';

import UserList from './UserList';
import * as UserForms from './UserForms';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Users</h1>

        <UserList endpoint="/api/users" />
      </div>
    );
  }
}

export class _Show extends React.Component {
  render() {
    const user = this.props.model;

    return (
      <div className="container-fluid model-info">
        <div className="row">
          <ProfileGravatar email={ user.email } />
        </div>
        <h1 className="page-header">{ user.formattedName }</h1>

        <div className="row">
          <Prop>Email</Prop>
          <Val><a href={ `mailto:${user.email}` }>{ user.email }</a></Val>
        </div>

        <div className="row">
          <Prop>Phone</Prop>
          <Val>{ user.phone }</Val>
        </div>

        <div className="row">
          <Prop>Address</Prop>
          <Val>
            { user.street }<br />
            { (user.address_2 ? user.address_2 : '') }
            { user.city }, { user.state } { user.zip }
          </Val>
        </div>

        <UserOrAdmin profileEmail={ user.email }>
          <div className="row">
            <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
              <small>
                <Link to={ `/users/${user.profileUrl}/edit` } className="btn btn-sm btn-outline-secondary btn-block">
                  Edit Profile
                </Link>
              </small>
            </div>
          </div>
        </UserOrAdmin>

      </div>
    );
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ModelView
        subStore="user_show"
        endpoint={ `/api/users/${ this.props.params.email }` }
        component={ _Show }
      />
    );
  }
}

export class Edit extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Editing User</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <UserForms.Edit email={ this.props.params.email } />
          </div>
        </div>
      </div>
    )
  }
}

class _Confirm extends React.Component {
  render() {
    if (this.props.model.confirmed == true) {
      return (
        <div className="offset-xs-1 col-xs-10">
          <div className="content-container">
            <p className="lead">You're all set!</p>

            <p>
              <Link to="/">Click here</Link> to proceed to your dashboard.
            </p>
          </div>
        </div>
      )
    }
  }
}

export class Confirm extends React.Component {
  render() {
    return (
      <ModelView
        subStore="user_confirm"
        endpoint={ `/api/users/confirm/${ this.props.params.token }` }
        component={ _Confirm }
      />
    )
  }
}