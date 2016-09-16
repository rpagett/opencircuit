import React from 'react';
import { Link } from 'react-router';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable'

export default class UnitEventsList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="unitEventsList"
          endpoint={ this.props.endpoint }
          emptyMessage="This unit is currently not registered for any events."
          columns={{
            'Name': reg => { return (<Link to={ reg.detailsUrl }>{ reg.name }</Link>) },
            'Date': reg => { return reg.formattedDate },
            'Class': reg => { return reg.competition_class },
            'Status': reg => { return reg.status },
          }}
        />
      </div>
    );
  }
};