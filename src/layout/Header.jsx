import React from 'react';
import NavBar from './NavBar';

class Header extends React.Component {
  render() {
    return (
      <header>
        <NavBar />
        { this.props.children }
      </header>
    );
  }
}

export default Header;