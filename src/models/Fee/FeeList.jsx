import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';
import Icon from '../../helpers/Icon';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable'
import { LaunchModalButton } from '../../modals/SpawnableModal';

export default class FeeList extends React.Component {
  canDelete(fee, user) {
    if (userHasRole(user, UserRoles.Administrator)) {
      return '/api/fees/' + fee._id
    }
  }

  render() {
    return (
      <div>
        <FlexTable
          name="feeList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no fees."
          columns={{
            'Unit': fee => {
              return (
                <Link to={ ( fee.unit !== null ? fee.unit.detailsUrl : '#err' ) }>
                  { ( fee.unit !== null ? fee.unit.name : 'unit error' ) }
                </Link>)
              },
            'Amount': fee => { return '$'+fee.amount },
            'Due': fee => { return fee.formattedDueDate },
            'Category': fee => { return fee.category.name },
            'Payments': fee => {
              const amountPaid = _.sumBy(fee.payments, 'amount');

              if (!amountPaid) {
                return '$0';
              }

              return (
                <span>
                  { '$' + amountPaid }
                  <LaunchModalButton
                    className="btn-link"
                    buttonText={ <Icon shape="info-circle" /> }

                    title="Payments"
                    componentName="FEE_PAYMENTS"
                    modalProps={{
                      payments: fee.payments
                    }}
                  />
                </span>
              )
            },
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
          canDelete={ this.canDelete }
          deriveName={ fee => { return ('$' + fee.amount + ' - ' + fee.unit.name) } }
        />
      </div>
    );
  }
};