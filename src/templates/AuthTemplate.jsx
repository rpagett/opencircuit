import React from 'react';
import AppContent from '../layout/appContent';

export default class AuthTemplate extends React.Component {
  render() {
    return (
      <AppContent>
        <div className="row">
          <div className="vcenter-parent col-xs-12 col-md-offset-3 col-md-6">
            { this.props.children }
          </div>
        </div>
      </AppContent>
    );
  }
};
