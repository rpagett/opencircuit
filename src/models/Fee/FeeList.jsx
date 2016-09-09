import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import { LaunchModalButton } from '../../modals/SpawnableModal';

export default class FeeList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="feeList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no fees."
          columns={{
            'Unit': fee => { return (<Link to={ fee.unit.detailsLink }>{ fee.unit.name }</Link>) },
            'Amount': fee => { return '$'+fee.amount },
            'Due': fee => { return fee.formattedDueDate },
            'Category': fee => { return fee.category.name },
            'Amount Paid': fee => { return '$' + _.sumBy(fee.payments, 'amount') },
            'Date Paid': fee => {
              if (fee.paid_date) {
                return <div>{ fee.formattedPaidDate }</div>
              }

              return (
                <div>
                  <LaunchModalButton
                    className="btn btn-sm btn-outline-success"
                    buttonText="Apply Payment"

                    title="Apply Payment"
                    componentName="FEE_APPLY_PAYMENT"
                    modalProps={{
                      fee: fee,
                      refreshTable: 'feeList',
                      refreshEndpoint: this.props.endpoint
                    }}
                  />
                </div>
              )
            }
          }}
        />
      </div>
    );
  }
};