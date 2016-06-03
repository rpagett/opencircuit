import React from 'react';

class BodyContent extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="content-container col-sm-offset-1 col-sm-10">
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default BodyContent;