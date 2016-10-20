import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';

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
            'Unit': obl => obl.unit.formattedName,
            'Form': obl => obl.form.name,
            'Due Date': obl => obl.formattedDueDate,
            'Submit...': obl => { return (
              <LaunchModalButton
                className="btn btn-sm btn-outline-info"
                buttonText="Submit Form"

                title="Submit Form"
                componentName="FORM_SUBMIT_FORM"
                modalProps={{
                  form: form,
                  obl: obl,
                  refreshTable: 'formObligationList',
                  refreshEndpoint: this.props.endpoint
                }}
               />
            )}
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ null }
        />
      </div>
    );
  }
};