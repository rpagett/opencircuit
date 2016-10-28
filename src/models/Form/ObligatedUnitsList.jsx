import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import { launch as launchModal } from '../../modals/ModalActions';
import { LaunchModalButton } from '../../modals/SpawnableModal';

export default class ObligatedUnitsList extends React.Component {
  canEdit(unit, user) {
    return null;
  }

  canDelete(unit, user) {
    return null
  }

  render() {
    return (
      <div>
        <FlexTable
          name="obligatedUnitList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no form obligations."
          columns={{
            'Unit': unit => { return <Link to={ unit.detailsUrl }>{ unit.name }</Link> },
            'Form': unit => unit.selectedForm.name,
            'Due Date': unit => unit.selectedForm.due_date,
            'Status': unit => {
              if (unit.selectedForm.system_filename) {
                if (unit.selectedForm.approved) {
                  return 'Approved';
                }
                else {
                  return 'Pending';
                }
              }

              return (
                <LaunchModalButton
                  className="btn btn-sm btn-outline-info"
                  buttonText="Submit Form"

                  title="Submit Form"
                  componentName="FORM_SUBMIT_FORM"
                  modalProps={{
                    form: unit.selectedForm,
                    unit,
                    refreshTable: 'obligatedUnitsList',
                    refreshEndpoint: this.props.endpoint
                  }}
                 />
              )
            }
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ null }
        />
      </div>
    );
  }
};