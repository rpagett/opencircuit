import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/flexTable/FlexTable'
import {launch as launchModal} from '../../modals/ModalActions';

export default class UnitList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="unitList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no registered units."
          columns={{
            'Name': unit => { return (<Link to={ unit.detailsLink }>{ unit.name }</Link>) },
            'Director': unit => {
              return (<Link to={ unit.director.profileUrl }>{ unit.director.formattedName }</Link>)
            },
            'Type': unit => { return unit.unit_type.name },
            'Class': unit => { return unit.competition_class.formattedName }
          }}
        />
      </div>
    );
  }
};