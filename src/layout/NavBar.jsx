import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

import Icon from '../helpers/Icon';
import { MiniGravatar } from '../helpers/gravatars';

class _UserDropdown extends React.Component {
  render() {
    return (
      <div className="nav-item right dropdown">
        <a className="user-dropdown nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
          <MiniGravatar email={ this.props.user.email } />{ '  ' + this.props.user.formattedName }
        </a>
        <div className="dropdown-menu">
          <a className="dropdown-item" href="#">View Profile</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/auth/logout">Log Out</a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

const UserDropdown = connect(mapStateToProps, mapDispatchToProps)(_UserDropdown);

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar-fixed-top navbar-full navbar-light bg-nav light-shadow" role="navigation">
        <button className="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#collapsingNav">
          <Icon shape="bars" />
        </button>
        <div className="collapse navbar-toggleable-xs navPadding" id="collapsingNav">
          <div className="nav navbar-nav flex-nav">
            <div className="nav-item">
              <Link to="/">
                <img src="/assets/img/NavbarLogo.png" alt="OpenCircuit" className="nav-logo" />
              </Link>
            </div>

            <div className="nav-item">
              <Link to="/" className="nav-link" activeClassName="active">
                <Icon shape="home" />{'  '}Dashboard
              </Link>
            </div>

            <div className="nav-item">
              <Link to="/events" className="nav-link" activeClassName="active">
                <Icon shape="trophy" />{'  '}Events
              </Link>
            </div>

            <div className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                <Icon shape="cog" />{'  '}Manage
              </a>
              <div className="dropdown-menu">
                <a className="dropdown-item" href="#">Circuit</a>
                <a className="dropdown-item" href="#">Users</a>
                <a className="dropdown-item" href="#">Etc.</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Separated link</a>
              </div>
            </div>

            <UserDropdown />

          </div>
        </div>
      </nav>
    );
  }
};

export default NavBar;