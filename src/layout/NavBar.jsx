import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Icon } from '../helpers/components';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar-fixed-top navbar-full navbar-light bg-nav light-shadow" role="navigation">
        <button className="navbar-toggler hidden-sm-up pull-xs-right" type="button" data-toggle="collapse" data-target="#collapsingNav">
          <Icon shape="bars" />
        </button>
        <div className="collapse navbar-toggleable-xs navPadding" id="collapsingNav">
          <ul className="nav navbar-nav flex-nav">
            <li className="nav-item pull-xs-none">
              <Link to="/">
                <img src="/assets/img/NavbarLogo.png" alt="OpenCircuit" className="nav-logo" />
              </Link>
            </li>

            <li className="nav-item pull-xs-none">
              <Link to="/" className="nav-item nav-link pull-xs-none">
                <Icon shape="home" /> Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};

export default NavBar;