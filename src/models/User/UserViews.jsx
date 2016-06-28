import React from 'react';
import { connect } from 'react-redux';

import * as UserActions from './UserActions';
import LoadingCube from '../../helpers/LoadingCube';
import UserList from './UserList';
import { ProfileGravatar } from '../../helpers/gravatars';
import { Prop, Val } from '../../layout/ModelInfo';
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
          <Val><a href={ user.email }>{ user.email }</a></Val>
        </div>

        <div className="row">
          <Prop>Phone</Prop>
          <Val>{ user.phone }</Val>
        </div>

        <div className="row">
          <Prop>Address</Prop>
          <Val>
            { user.street }< br/>
            { (user.address_2 ? user.address_2 + '<br />': '') }
            { user.city }, { user.state } { user.zip }
          </Val>
        </div>
      </div>
    );
  }
}

const mapStateToUserProfileProps = (state) => {
  return {
    user: state.users.profileUser,
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
            <UserForms.Edit email={ this.props.params.email }/>
          </div>
        </div>
      </div>
    )
  }
}