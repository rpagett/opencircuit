import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import ContentsView from '../../helpers/ContentsView/ContentsView';
import FeeList from './FeeList';
import { LaunchModalButton } from '../../modals/SpawnableModal';
import { CircuitLogo } from '../../helpers/logos';

class _FeeCategories extends React.Component {
  render() {
    const names = _.map(this.props.contents, 'name');
    let pills = [ ];

    names.map(name => {
      pills.push(<span className="tag tag-pill tag-info" key={ name }>{ name }</span>)
    })

    return (
      <div>
        <p>
          <strong>Fee Categories: </strong>{ pills }
        </p>
      </div>
    )
  }
}

export class Index extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Fees</h1>

        <FeeList endpoint="/api/fees" />

        <div className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <LaunchModalButton
              className="btn btn-sm btn-block btn-outline-danger"
              buttonText="Assess Fee"

              title="Assess Fee"
              componentName="FEE_ASSESS_FEE"
              modalProps={{
                refreshTable: 'feeList',
                refreshEndpoint: '/api/fees'
              }}
            />
          </div>
        </div>

        <p></p>

        <div className="row">
          <ContentsView
            subStore="fee_categories"
            endpoint="/api/feecategories"
            component={ _FeeCategories }
          />
        </div>
      </div>
    )
  }
}

class _Invoice extends React.Component {
  render() {
    let rows = [ ];
    let total = 0;
    this.props.contents.fees.map(fee => {
      let amountPaid = 0;

      for (let key in fee.payments) {
        amountPaid += fee.payments[key].amount;
      }

      total += ( fee.amount - amountPaid );
      rows.push(
        <div className="row" key={ fee._id }>
          <div className="col-xs-3" key={ `${fee._id}-name` }>{ fee.unit.name }</div>
          <div className="col-xs-3" key={ `${fee._id}-assessed`}>{ fee.formattedAssessedDate }</div>
          <div className="col-xs-3" key={ `${fee._id}-due`}>{ fee.formattedDueDate }</div>
          <div className="col-xs-3 text-xs-right" key={ `${fee._id}-AR` }>${ fee.amountRemaining }</div>
        </div>
      )
    })

    return (
      <div className="container-fluid invoice-container col-xs-12">
        <div className="row">
          <div className="col-xs-12 invoice-header">Account Invoice</div>
        </div>

        <div className="row invoice-address">
          <div className="col-xs-4">
            <CircuitLogo className="circuit-logo" />
          </div>
          <div className="offset-xs-4 col-xs-4 text-xs-right">
            <strong>CWEA</strong><br />
            Attn: Accounts Receivable<br />
            PO Box 3614<br />
            Rock Hill, SC 29732
          </div>
        </div>

        <div className="row">
          <div className="card card-block offset-xs-1 col-xs-10">
            <div className="card-header black">
              Outstanding Fees for { this.props.contents.orgName }
            </div>
            <div className="card-block">
              <div className="row">
                <div className="col-xs-3"><strong>Unit Name</strong></div>
                <div className="col-xs-3"><strong>Date Assessed</strong></div>
                <div className="col-xs-3"><strong>Date Due</strong></div>
                <div className="col-xs-3 text-xs-right"><strong>Amount Due</strong></div>
              </div>
              { rows }
            </div>
            <div className="card-footer text-xs-right">
              <strong>Total: ${ total }</strong>
            </div>
          </div>
        </div>

        <div className="row">
          <hr />
        </div>

        <div className="row">
          <div className="text-xs-center m-x-auto app-plug">invoicing powered by</div>
        </div>
        <div className="row">
          <div className="m-x-auto">
            <img src="/assets/img/2016NavbarLogo.png" alt="OpenCircuit" aria-hidden="true" />
          </div>
        </div>
      </div>
    )
  }
}

export class Invoice extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="fee_invoice"
        endpoint={ `/api/fees/invoice/${this.props.params.org}` }
        component={ _Invoice }
      />
    )
  }
}