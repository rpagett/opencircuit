import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'

export default class EventList extends React.Component {
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
        />
      </div>
    );
  }
};