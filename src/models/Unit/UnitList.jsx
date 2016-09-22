import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';

export default class UnitList extends React.Component {
  canEdit(unit, user) {
    if (unit.director._id.toString() == user._id.toString() || userHasRole(user, UserRoles.EventDirector)) {
      return unit.detailsUrl + '/edit'
    }

    return null;
  }

  canDelete(unit, user) {
    if (userHasRole(user, UserRoles.Administrator)) {
      return '/api' + unit.detailsUrl;
    }
  }

  render() {
    return (
      <div>
        <FlexTable
          name="unitList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no registered units."
          columns={{
            'Name': unit => { return (<Link to={ unit.detailsUrl }>{ unit.name }</Link>) },
            'Director': unit => {
              return (
                <Link to={ (unit.director ? unit.director.profileUrl : '#' ) }>
                  { (unit.director ? unit.director.formattedName : 'none') }
                </Link>
              )
            },
            'Type': unit => { return unit.unit_type.name },
            'Class': unit => { return (unit.competition_class ? unit.competition_class.formattedName : 'none') }
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ unit => unit.name }
        />
      </div>
    );
  }
};