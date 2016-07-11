import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../flexTable/FlexTable'
//import {launch as launchModal} from '../../modals/ModalActions';

export default class EventList extends React.Component {
  //launchRolesOverlay(dispatch) {
  //  dispatch(launchModal(this.formattedName + '\'s Roles', 'USER_ROLES', {
  //    email: this.email
  //  }));
  //}

  render() {
    return (
      <div>
        <FlexTable
          endpoint={ this.props.endpoint }
          emptyMessage="There are no scheduled events."
          columns={{
            'Name': event => { return (<Link to={ event.detailsUrl }>{ event.name }</Link>) },
            'Date': event => { return event.formattedDate },
            'Cap': event => { return event.attendance_cap },
          }}
        />
      </div>
    );
  }
};