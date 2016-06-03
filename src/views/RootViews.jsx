import React from 'react';

export class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="alert alert-success">
          Everything is wonderful!

          <span className="pull-right"><strong>Seriously!</strong></span>
        </div>
      </div>
    );
  }
}

export class About extends React.Component {
  render() {
    return (
      <div>
        <div class="h4">About Stuff</div>
      </div>
    );
  }
}