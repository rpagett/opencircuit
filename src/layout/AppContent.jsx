import React from 'react';

class AppContent extends React.Component {
  render() {
    return (
      <div className="container-fluid app-container">
        { this.props.children }
      </div>
    );
  }
}

export default AppContent;