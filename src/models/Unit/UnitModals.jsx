import React from 'react';

import { ReduxForm, ClassSelect } from '../../forms/components';

export class Reclassify extends React.Component {
  render() {
    const unit = this.props.unit;

    return (
      <ReduxForm
        subStore="unit_reclassify"
        submitEndpoint={ `/api/units/${unit._id}/reclassify` }
        submitMethod="PATCH"
        inModal={ true }
      >
        <ClassSelect
          name="compclass"
          unitType={ unit.unit_type._id }
          scholastic={ unit.organization.is_school }
        />

        <button className="btn btn-success btn-block">
          Change Class
        </button>
      </ReduxForm>
    )
  }
}