import React from 'react';

export class Prop extends React.Component {
  render() {
    return (
      <div className="prop col-xs-offset-2 col-xs-12 col-sm-offset-0 col-sm-5 text-sm-right">
        { this.props.children }
      </div>
    );
  }
}

export class Val extends React.Component {
  render() {
    return (
      <div className="val col-xs-offset-4 col-xs-8 col-sm-offset-0 col-sm-7">
        { this.props.children }
      </div>
    );
  }
}