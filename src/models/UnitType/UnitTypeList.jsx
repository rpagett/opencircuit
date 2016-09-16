import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import { UserRoles, userHasRole } from '../User/UserRoles'
import {launch as launchModal} from '../../modals/ModalActions';

export default class UnitTypeList extends React.Component {
  canEdit(type, user) {
    if (userHasRole(user, UserRoles.Administrator)) {
      return type.detailsUrl + '/edit'
    }

    return null;
  }

  canDelete(type, user) {
    if (userHasRole(user, UserRoles.Administrator) && type.unitCount == 0) {
      return '/api' + type.detailsUrl;
    }

    return null;
  }

  render() {
    return (
      <div>
        <FlexTable
          name="unitTypeList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no unit types."
          columns={{
            'Name': type => {
              return (
                <Link to={ type.detailsUrl }>{ type.name }</Link>
              )
            },
            'Unit Count': type => { return type.unitCount }
          }}
          deriveName={ type => type.name }
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
        />
      </div>
    );
  }
};