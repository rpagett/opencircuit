import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';

export default class UnitsInEventList extends React.Component {
  canEdit(reg, user) {
    if (reg.unit.director._id.toString() == user._id.toString() || userHasRole(user, UserRoles.EventDirector)) {
      return reg.unit.detailsUrl + '/edit'
    }

    return null;
  }

  render() {
    return (
      <div>
        <FlexTable
          name={ this.props.name }
          fedContents={ this.props.contents }
          emptyMessage="There are no registered units."
          columns={{
            'Name': reg => {
              return (
                <Link to={ (reg.unit ? reg.unit.detailsUrl : 'error') }>
                  { (reg.unit ? reg.unit.name : 'error') }
                </Link>
              )
            },
            'Director': reg => {
              return (
                <Link to={ (reg.unit && reg.unit.director ? reg.unit.director.profileUrl : '#') }>
                  { (reg.unit && reg.unit.director ? reg.unit.director.formattedName : 'error') }
                </Link>
              )
            },
            'Type': reg => { return (reg.unit && reg.unit.unit_type ? reg.unit.unit_type.name : 'error') },
            'Class': reg => { return (reg.competition_class ? reg.competition_class.formattedName : 'error') }
          }}
          canEdit={ this.canEdit }
          deriveName={ reg => reg.unit.name }
        />
      </div>
    );
  }
};