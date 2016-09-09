import React from 'react';
import { MD5 } from './functions';

export class MiniGravatar extends React.Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired
  }

  render() {
    const hash = MD5(this.props.email);

    return (
      <img
        src={'//www.gravatar.com/avatar/' + hash + '?s=30&d=mm'}
        className="gravatar"
        aria-hidden="true"
      />
    );
  }
}

export class ProfileGravatar extends React.Component {
  static propTypes = {
    email: React.PropTypes.string.isRequired
  }

  render() {
    const hash = MD5(this.props.email);

    return (
      <img
        src={'//www.gravatar.com/avatar/' + hash + '?s=150&d=mm'}
        className="img-fluid m-x-auto profile-gravatar"
        aria-hidden="true"
      />
    );
  }
}