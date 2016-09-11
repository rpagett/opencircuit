import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import {launch as launchModal} from '../../modals/ModalActions';

export default class OrganizationList extends React.Component {

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
              <Link to={ org.director.profileUrl }>{ org.director.formattedName }</Link>
            )},
            'Units': org => { return org.unitCount },
            'Type': org => { return (org.is_school ? 'Scholastic' : 'Independent')}
          }}
        />
      </div>
    );
  }
};