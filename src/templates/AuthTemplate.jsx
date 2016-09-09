import React from 'react';
import AppContent from '../layout/AppContent';

export default class AuthTemplate extends React.Component {
  render() {
    return (
      <AppContent>
        <div className="row">
          { this.props.children }
        </div>
      </AppContent>
    );
  }
};
