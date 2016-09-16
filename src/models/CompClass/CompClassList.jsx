import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import { UserRoles, userHasRole } from '../User/UserRoles';
import { launch as launchModal } from '../../modals/ModalActions';

export default class CompClassList extends React.Component {
  canEdit(compclass, user) {
    if (userHasRole(user, UserRoles.Administrator)) {
      return compclass.detailsUrl + '/edit';
    }

    return null;
  }

  canDelete(compclass, user) {
    if (userHasRole(user, UserRoles.Administrator) && compclass.unitCount == 0) {
      return '/api' + compclass.detailsUrl;
    }

    return null;
  }

  render() {
    return (
      <div>
        <FlexTable
          name="compClassList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no competitive classes."
          columns={{
            'Name': compclass => {
              return (
                <Link to={ compclass.detailsUrl }>{ compclass.name }</Link>
              )
            },
            'Abbreviation': compclass => { return compclass.abbreviation.toUpperCase() },
            'Unit Type': compclass => { return compclass.unit_type.name },
            'Unit Count': compclass => { return compclass.unitCount }
          }}
          deriveName={ compclass => compclass.formattedName }
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
        />
      </div>
    );
  }
};