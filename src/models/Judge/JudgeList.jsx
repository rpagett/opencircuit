import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';

export default class JudgeList extends React.Component {
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
          name="judgeList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no judges."
          columns={{
            'Name': judge => judge.formattedName,
            'Phone': judge => judge.phone,
            'Email': judge => { return (<a href={ `mailto:${judge.email}` }>{ judge.email }</a>) },
            'City': judge => judge.city,
            'State': judge => judge.state
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ judge => judge.formattedName }
        />
      </div>
    );
  }
};