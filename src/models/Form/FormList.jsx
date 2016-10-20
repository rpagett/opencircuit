import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';

export default class FormList extends React.Component {
  canEdit(form, user) {
    return null;
  }

  canDelete(form, user) {
    return null
  }

  render() {
    return (
      <div>
        <FlexTable
          name="formList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no forms."
          columns={{
            'Name': form => form.name,
            'Assigned To': form => form.assignedUnitCount,
            'Auto-Apply': form => form.autoApplyList,
            'Assign...': form => { return (
              <LaunchModalButton
                className="btn btn-sm btn-outline-danger"
                buttonText="Assign to Unit"

                title="Assign Form"
                componentName="FORM_ASSIGN_OBLIGATION"
                modalProps={{
                  form: form,
                  refreshTable: 'formList',
                  refreshEndpoint: this.props.endpoint
                }}
              />
            )}
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ form => form.name }
        />
      </div>
    );
  }
};