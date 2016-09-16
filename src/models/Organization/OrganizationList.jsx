import React from 'react';
import { Link } from 'react-router';

import { UserRoles, userHasRole } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';

export default class OrganizationList extends React.Component {
  canEdit(org, user) {
    if (userHasRole(user, UserRoles.Administrator)) {
      return org.detailsUrl + '/edit';
    }

    return null;
  }

  canDelete(org, user) {
    if (userHasRole(user, UserRoles.Administrator) && org.unitCount == 0) {
      return '/api' + org.detailsUrl;
    }

    return null
  }

  render() {
    return (
      <div>
        <FlexTable
          name="organizationList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no registered organizations."
          columns={{
            'Name': org => { return (<Link to={ org.detailsUrl }>{ org.name }</Link>) },
            'Director': org => { return (
              <Link to={ (org.director ? org.director.profileUrl : '#') }>{ org.director.formattedName }</Link>
            )},
            'Units': org => { return org.unitCount },
            'Type': org => { return (org.is_school ? 'Scholastic' : 'Independent')}
          }}
          deriveName={ org => org.name }
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
        />
      </div>
    );
  }
};