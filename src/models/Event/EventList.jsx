import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable'

export default class EventList extends React.Component {
  canEdit(event, user) {
    if (userHasRole(user, UserRoles.EventDirector)) {
      return event.detailsUrl + '/edit'
    }

    return null;
  }

  canDelete(event, user) {
    if (userHasRole(user, UserRoles.Administrator)) {
      return '/api' + event.detailsUrl;
    }

    return null;
  }

  render() {
    return (
      <div>
        <FlexTable
          name="eventList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no scheduled events."
          columns={{
            'Name': event => { return (<Link to={ event.detailsUrl }>{ event.name }</Link>) },
            'Date': event => { return event.formattedDate },
            'Cap': event => { return event.attendance_cap },
          }}
          deriveName={ event => event.name }
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
        />
      </div>
    );
  }
};