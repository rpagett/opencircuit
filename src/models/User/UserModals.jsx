import React from 'react';

import { ReduxForm, Checkbox } from '../../forms/components';
import { UserRoles, userRoleLabel } from './UserRoles';

export class ManageRoles extends React.Component {
  render() {
    let boxes = [ ];
    for (let key in UserRoles) {
      boxes.push(
        <Checkbox
          name="roles[]"
          key={ key }
          label={ userRoleLabel(UserRoles[key]) }
          value={ UserRoles[key] }
        />
      );
    }

    return (
      <div className="checkbox-group">
        <ReduxForm
          subStore="user_roles"
          fetchEndpoint={ `/api/users/${this.props.email}/roles` }
          submitEndpoint={ `/api/users/${this.props.email}/roles` }
          submitMethod="PATCH"
          inModal={ true }
        >
          { boxes }
          <button type="submit" className="btn btn-success btn-block">Save</button>
        </ReduxForm>
      </div>
    )
  }
}