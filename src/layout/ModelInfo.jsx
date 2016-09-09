import React from 'react';

export class Prop extends React.Component {
  render() {
    return (
      <div className="prop offset-xs-2 col-xs-12 offset-sm-0 col-sm-5 text-sm-right">
        { this.props.children }
      </div>
    );
  }
}

export class Val extends React.Component {
  render() {
    return (
      <div className="val offset-xs-4 col-xs-8 offset-sm-0 col-sm-7">
        { this.props.children }
      </div>
    );
  }
}