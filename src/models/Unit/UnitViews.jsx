import React from 'react';

import UnitList from './UnitList';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Units</h1>

        <UnitList endpoint="/api/units" />
      </div>
    )
  }
}
