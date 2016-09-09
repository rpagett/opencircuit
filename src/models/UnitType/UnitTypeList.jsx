import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import {launch as launchModal} from '../../modals/ModalActions';

export default class UnitTypeList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="unitTypeList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no unit types."
          columns={{
            'Name': type => {
              return (
                <Link to={ type.detailsUrl }>{ type.name }</Link>
              )
            },
            'Unit Count': type => { return type.unitCount }
          }}
        />
      </div>
    );
  }
};