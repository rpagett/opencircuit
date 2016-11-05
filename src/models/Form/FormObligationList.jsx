import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import { launch as launchModal } from '../../modals/ModalActions';
import { LaunchModalButton } from '../../modals/SpawnableModal';

export default class FormObligationList extends React.Component {
  canEdit(obl, user) {
    return null;
  }

  canDelete(obl, user) {
    return null
  }

  render() {
    return (
      <div>
        <FlexTable
          name="formObligationList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no form obligations."
          columns={{
            'Unit': obl => obl.unit.name,
            'Form': obl => { return (
              <a href={ `/api/forms/${obl.form._id}/download` } target="_blank">{ obl.form.name }</a>
            )},
            'Due Date': obl => obl.formattedDueDate,
            'Status': obl => {
              if (obl.system_filename) {
                if (obl.approved) {
                  return <a href={ `/api/forms/submission/${obl._id}` } target="_blank">Approved</a>;
                }
                else if (obl.submitted) {
                  return 'Submitted';
                }
                else {
                  return (<p>Pending (<Link to={ '/forms/verify/' + obl._id }>Submit</Link>)</p>);
                }
              }

              return (
                <LaunchModalButton
                  className="btn btn-sm btn-outline-info"
                  buttonText="Submit Form"

                  title="Submit Form"
                  componentName="FORM_SUBMIT_FORM"
                  modalProps={{
                    form: obl.form,
                    unit: obl.unit,
                    refreshTable: 'formObligationList',
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