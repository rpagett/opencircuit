import React from 'react';

import JudgeList from './JudgeList';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Judges</h1>

        <p></p>

        <JudgeList endpoint="/api/judges" />
      </div>
    )
  }
}