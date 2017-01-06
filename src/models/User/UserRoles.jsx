import React from 'react';
import { connect } from 'react-redux';

export const UserRoles = Object.freeze({
  Administrator: 1,
  EventDirector: 2,
  FormsManager: 3,
  JudgeManager: 4,
  CircuitStaff: 5
});

export const userRoleLabel = id => {
  switch (id) {
    case UserRoles.Administrator:
      return 'Administrator';

    case UserRoles.EventDirector:
      return 'Event Director';

    case UserRoles.FormsManager:
      return 'Forms Manager';

    case UserRoles.JudgeManager:
      return 'Judge Manager';

    case UserRoles.CircuitStaff:
      return 'Circuit Staff';

    default:
      return '';
  }
}

export function userHasRole(user, role) {
  return user.roles.includes(UserRoles.Administrator) || user.roles.includes(role);
}

class _HasRole extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    role: React.PropTypes.number.isRequired
  }

  hasRole() {
    return this.props.user.roles.includes(UserRoles.Administrator) || this.props.user.roles.includes(this.props.role);
  }

  render() {
    if (!this.hasRole()) {
      return (<div></div>);
    }

    return <div {...this.props}>{ this.props.children }</div>
  }
}

const mapStateToHRProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToHRProps = dispatch => {
  return { }
}

export const HasRole = connect(mapStateToHRProps, mapDispatchToHRProps)(_HasRole);

class _UserOrAdmin extends React.Component {
  static propTypes = {
    user: React.PropTypes.object.isRequired,
    profileEmail: React.PropTypes.string.isRequired
  }

  canAccess() {
    return this.props.user.email == this.props.profileEmail || this.props.user.roles.includes(UserRoles.Administrator);
  }

  render() {
    if (!this.canAccess()) {
      return null;
    }

    return this.props.children;
  }
}

const mapStateToUOAProps = state => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToUOAProps = dispatch => {
  return { }
}

export const UserOrAdmin = connect(mapStateToUOAProps, mapDispatchToUOAProps)(_UserOrAdmin);