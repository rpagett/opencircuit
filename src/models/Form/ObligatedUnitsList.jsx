import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import { launch as launchModal } from '../../modals/ModalActions';
import { LaunchModalButton } from '../../modals/SpawnableModal';

export default class ObligatedUnitsList extends React.Component {
  canEdit(obl, user) {
    return null;
  }

  canDelete(obl, user) {
    if (userHasRole(user, UserRoles.FormsManager)) {
      return `/api/forms/obligation/${obl.unit._id}/${obl.form._id}`
    }

    return null
  }

  render() {
    return (
      <div>
        <FlexTable
          name="obligatedUnitsList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no form obligations."
          columns={{
            'Unit': obl => { return <Link to={ obl.unit.detailsUrl }>{ obl.unit.name }</Link> },
            'Form': obl => {
              return <Link to={ obl.form.detailsUrl }>{ obl.form.name }</Link>
            },
            'Due Date': obl => obl.form.formattedDueDate,
            'Status': obl => {
              if (obl.system_filename) {
                if (obl.approved) {
                  return <a href={ `/api/forms/submission/${obl.unit._id}/${obl.form._id}` } target="_blank">Approved</a>;
                }
                else if (obl.submitted) {
                  return (<p>Submitted (<Link to={ `/forms/review/${obl.unit._id}/${obl.form._id}` }>Review</Link>)</p>);
                }
                else {
                  return (<p>Pending (<Link to={ `/forms/verify/${obl.unit._id}/${obl.form._id}` }>Submit</Link>)</p>);
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
                    refreshTable: 'obligatedUnitsList',
                    refreshEndpoint: this.props.endpoint
                  }}
                 />
              )
            }
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ obl => { return (obl.form.name + ' for ' + obl.unit.name) } }
        />
      </div>
    );
  }
};