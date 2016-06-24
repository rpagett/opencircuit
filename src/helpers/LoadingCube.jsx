import React from 'react';

export default class LoadingCube extends React.Component {
  static propTypes = {
    show: React.PropTypes.bool.isRequired
  }

  render() {
    if (this.props.show) {
      return (
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube" />
          <div className="sk-cube2 sk-cube" />
          <div className="sk-cube4 sk-cube" />
          <div className="sk-cube3 sk-cube" />
        </div>
      );
    }

    return '';
  }
}