import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';

export default class SpielList extends React.Component {
  canEdit(unit, user) {
    return '/spiels/' + unit.slug
  }

  render() {
    return (
      <div>
        <FlexTable
          name="spielList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no units."
          columns={{
            'Name': unit => { return <Link to={ unit.detailsUrl }>{ unit.name }</Link> },
            'Show Title': unit => { return (unit.spiel ? unit.spiel.show_title : 'No spiel') },
            'Last Revision': unit => { return (unit.spiel ? Moment(unit.spiel.updatedAt).format('MMM. Do, YYYY [at] h:mm a') : 'N/A') }
          }}
          fedContents={ this.props.units }
          canEdit={ this.canEdit }
          canDelete={ null }
          deriveName={ unit => unit.name }
        />
      </div>
    );
  }
};