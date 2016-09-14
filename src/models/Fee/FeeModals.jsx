import React from 'react';
import { Link } from 'react-router';

import ContentsView from '../../helpers/ContentsView/ContentsView';
import { ReduxForm, FormInput, Checkbox, DateTime, TextArea, PaymentTypeSelect, FeeCategorySelect, UnitSelect } from '../../forms/components';
import PaymentTypes from './PaymentTypes';

export class AdminPayment extends React.Component {
  render() {
    const fee = this.props.fee;

    return (
      <div>
        <ReduxForm
          subStore="fee_admin_payment"
          submitEndpoint={ `/api/fees/${fee._id}/applyPayment` }
          submitMethod="POST"
          inModal={ true }
        >
          <FormInput name="amount" label="Amount to Apply" beforeInput="$" />
          <PaymentTypeSelect name="payment_type" label="Payment Type" />

          <button name="submit" type="submit" className="btn btn-success btn-block">
            Apply Payment
          </button>
        </ReduxForm>
      </div>
    )
  }
}

class _UserPayment extends React.Component {
  render() {
    let boxes = [ ];
    this.props.contents.map(fee => {
      boxes.push(
        <Checkbox name="fees" label={ `${fee.unit.name} - \$${fee.amountRemaining}` } value={ fee._id } key={ fee._id } />
      )
    })

    return (
      <ReduxForm
        subStore="fee_userPay"
        submitEndpoint="/api/fees/userPay"
        submitMethod="POST"
      >
        { boxes }

        <button type="submit" role="submit" name="submit" className="btn btn-block btn-primary">
          Proceed to Paypal
        </button>
      </ReduxForm>
    )
  }
}

export class UserPayment extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="fee_userPay"
        endpoint={ `/api/fees/forUser/${this.props.user._id}` }
        component={ _UserPayment }
      />
    )
  }

}

export class AssessFee extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="fee_assess"
        submitEndpoint={ `/api/fees/` }
        submitMethod="POST"
        inModal={ true }
      >
        <UnitSelect name="unit" label="Unit" />
        <FormInput name="amount" label="Amount" />
        <FeeCategorySelect name="category" label="Fee Category" />
        <DateTime name="due_date" label="Due" />

        <TextArea name="notes" label="Notes" />

        <button name="submit" type="submit" className="btn btn-danger btn-block">
          Assess Fee
        </button>
      </ReduxForm>
    )
  }
}

export class GenerateInvoice extends React.Component {
  render() {
    let buttons = [ ];
    this.props.orgs.map(org => {
      buttons.push(
        <div className="row">
          <div className="col-xs-12" key={ org._id } >
            <Link
              onClick={ this.props.markClosed }
              role="button"
              className="btn btn-primary btn-block"
              to={ `/invoice/${org._id}` }
            >
              { org.name }
            </Link>
          </div>
        </div>
      )
    })

    return (
      <div>
        <p>Select the organization to invoice.</p>

        { buttons }
      </div>
    )
  }
}

export class Payments extends React.Component {
  render() {
    let lines = [ ];

    this.props.payments.map(payment => {
      lines.push(
        <div className="row">
          <div className="col-xs-6">${ payment.amount }</div>
          <div className="col-xs-6">{ PaymentTypes[payment.method] }</div>
        </div>
      )
    })
    return (
      <div>
        <div className="row">
          <div className="col-xs-6"><strong>Amount</strong></div>
          <div className="col-xs-6"><strong>Method</strong></div>
        </div>
        { lines }
      </div>
    )
  }
}