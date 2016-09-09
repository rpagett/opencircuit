import React from 'react';

import { ReduxForm, ClassSelect } from '../../forms/components';

export class Reclassify extends React.Component {
  render() {
    const unit = this.props.unit;

    return (
      <ReduxForm
        subStore="unit_reclassify"
        submitEndpoint="/api/units/reclassify"
        submitMethod="PATCH"
      >
        <ClassSelect unitType={ unit.unit_type } scholastic={ unit.organization.is_school } />

        <button className="btn btn-success btn-block">
          Change Class
        </button>
      </ReduxForm>
    )
  }
}