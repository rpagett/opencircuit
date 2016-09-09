import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import FlexTable from '../../helpers/flexTable/FlexTable'

export default class UserFeeList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="userFeeList"
          endpoint={ this.props.endpoint }
          emptyMessage="You owe no fees."
          columns={{
            'Unit': fee => { return (<Link to={ fee.unit.detailsLink }>{ fee.unit.name }</Link>) },
            'Amount': fee => { return '$'+fee.amount },
            'Due': fee => { return fee.formattedDueDate },
            'Category': fee => { return fee.category.name },
            'Amount Paid': fee => { return '$' + _.sumBy(fee.payments, 'amount') }
          }}
        />
      </div>
    );
  }
};