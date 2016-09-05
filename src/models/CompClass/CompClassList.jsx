import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/flexTable/FlexTable'
import { launch as launchModal } from '../../modals/ModalActions';

export default class CompClassList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="compClassList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no competitive classes."
          columns={{
            'Name': compclass => {
              return (
                <Link to={ compclass.detailsUrl }>{ compclass.name }</Link>
              )
            },
            'Abbreviation': compclass => { return compclass.abbreviation.toUpperCase() },
            'Unit Type': compclass => { return compclass.unit_type.name },
            'Unit Count': compclass => { return compclass.unitCount }
          }}
        />
      </div>
    );
  }
};