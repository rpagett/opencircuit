import React from 'react';

class BodyContent extends React.Component {
  render() {
    return (
      <div className="row" style={{ 'height': '100%' }}>
        <div className="content-container offset-sm-1 col-sm-10 body-container">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default BodyContent;