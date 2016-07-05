import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import * as UserActions from './UserActions';
import LoadingCube from '../../helpers/LoadingCube';
import UserList from './UserList';
import { ProfileGravatar } from '../../helpers/gravatars';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserOrAdmin } from './UserRoles';
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

export class _UserProfile extends React.Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    isLoading: true
  }

  componentWillMount() {
    this.props.fetchUserProfile(this.props.email);
  }

  render() {
    if (this.props.error) {
      return (
        <strong>{ this.props.error }</strong>
      )
    }
    if (this.props.isLoading) {
      return (
        <div>
          <LoadingCube show={ true } />
        </div>
      );
    }

    const user = this.props.user;

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
            <div className="pull-center col-xs-12 col-sm-offset-4 col-sm-4">
              <small>
                <Link to={ `${user.profileURL}/edit` } className="btn btn-sm btn-secondary-outline btn-block">
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

const mapStateToUserProfileProps = (state) => {
  return {
    user: state.users.profileUser,
    error: state.users.profileError,
    isLoading: state.users.profileLoading
  }
}

const mapDispatchToUserProfileProps = (dispatch) => {
  return {
    fetchUserProfile: (email) => {
      dispatch(UserActions.fetchProfile(email))
    }
  };
}

const UserProfile = connect(mapStateToUserProfileProps, mapDispatchToUserProfileProps)(_UserProfile);

export class Show extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <UserProfile email={ this.props.params.email } />
      </div>
    );
  }
}

export class Edit extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Editing User</h1>
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
            <UserForms.Edit email={ this.props.params.email } />
          </div>
        </div>
      </div>
    )
  }
}