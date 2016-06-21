import React from 'react';
import { Link, IndexLink } from 'react-router';
import Icon from '../helpers/Icon';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar-fixed-top navbar-full navbar-light bg-nav light-shadow" role="navigation">
        <button className="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#collapsingNav">
          <Icon shape="bars" />
        </button>
        <div className="collapse navbar-toggleable-xs navPadding" id="collapsingNav">
          <ul className="nav navbar-nav flex-nav">

            <li className="nav-item">
              <Link to="/">
                <img src="/assets/img/NavbarLogo.png" alt="OpenCircuit" className="nav-logo" />
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link">
                <Icon shape="home" />{'  '}Dashboard
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/events" className="nav-link">
                <Icon shape="trophy" />{'  '}Events
              </Link>
            </li>

            <li className="nav-item dropdown">
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
            </li>
          </ul>

          <div className="nav-item pull-sm-right pull-xs-none">
            <Link to="/auth/logout" className="nav-link">
              Logout
            </Link>
          </div>
          
        </div>
      </nav>
    );
  }
};

export default NavBar;