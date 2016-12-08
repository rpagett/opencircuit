import React from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';

import Icon from '../helpers/Icon';
import { HasRole, UserRoles } from '../models/User/UserRoles';
import { MiniGravatar } from '../helpers/gravatars';

class UserDropdown extends React.Component {
  render() {
    return (
      <div className="nav-item right dropdown user-dropdown">
        <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
          <MiniGravatar email={ this.props.user.email } />{ '  ' + this.props.user.formattedName }
        </a>
        <div className="dropdown-menu">
          <Link to={ this.props.user.profileUrl } className="dropdown-item">View Profile</Link>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="/auth/logout">Log Out</a>
        </div>
      </div>
    );
  }
}

class _NavBar extends React.Component {
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
                <img src="/assets/img/2016NavbarLogo.png" alt="OpenCircuit" className="nav-logo" aria-hidden="true" />
              </Link>
            </div>

            <div className="nav-item">
              <IndexLink to="/" className="nav-link" activeClassName="active">
                <Icon shape="home" /> Dashboard
              </IndexLink>
            </div>

            <div className="nav-item">
              <IndexLink to="/events" className="nav-link" activeClassName="active">
                <Icon shape="trophy" /> Events
              </IndexLink>
            </div>

            <div className="nav-item">
              <IndexLink to="/support" className="nav-link" activeClassName="active">
                <Icon shape="question-circle-o" /> Support
              </IndexLink>
            </div>

            <HasRole role={ UserRoles.Administrator } className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                <Icon shape="cog" /> Manage
              </a>
              <div className="dropdown-menu">
                <Link to="/compclasses" className="dropdown-item">Classes</Link>
                <Link to="/fees" className="dropdown-item">Fees</Link>
                <Link to="/forms" className="dropdown-item">Forms</Link>
                <Link to="/judges" className="dropdown-item">Judges</Link>
                <Link to="/organizations" className="dropdown-item">Organizations</Link>
                <Link to="/reports" className="dropdown-item">Reports</Link>
                <Link to="/spiels" className="dropdown-item">Spiels</Link>
                <Link to="/units" className="dropdown-item">Units</Link>
                <Link to="/unittypes" className="dropdown-item">Unit Types</Link>
                <Link to="/users" className="dropdown-item">Users</Link>
              </div>
            </HasRole>

            <UserDropdown user={ this.props.user }/>

          </div>
        </div>
      </nav>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return { }
}

const NavBar = connect(mapStateToProps, mapDispatchToProps)(_NavBar);
export default NavBar;