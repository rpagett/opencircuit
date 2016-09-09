import React from 'react';

export class CircuitLogo extends React.Component {
  render() {
    return (
      <img
        className={ 'img-fluid ' + this.props.className }
        src="/assets/img/cwea.png"
        alt="CWEA Logo"
      />
    )
  }
}