import React from 'react';
import Moment from 'moment';
import { Link } from 'react-router';


import ContentsView from '../../helpers/ContentsView/ContentsView';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Reports</h1>
        <p></p>
        <ul>
          <li><Link to="/reports/quickbooks">Quickbooks</Link></li>
        </ul>
      </div>
    )
  }
}

class _Quickbooks extends React.Component {
  render() {
    let rows = [ ];
    let lastWeek = 0;
    this.props.contents.map(unit => {
      let date = Moment(unit.createdAt);

      if (date.week() != lastWeek) {
        rows.push(
          <div className="row"><p></p></div>
        )
        lastWeek = date.week();
      }

      rows.push(
        <div className="row">
          <div className="offset-xs-1 col-xs-5">{ unit.name }</div>
          <div className="col-xs-5">{ date.format('MMM. Do, YYYY h:mm a') }</div>
        </div>
      )
    })

    return (
      <div>
        <h1 className="page-header">Units by Registration Date</h1>

        <div className="row">
          <div className="offset-xs-1 col-xs-5"><strong>Unit</strong></div>
          <div className="col-xs-5"><strong>Registration Date</strong></div>
        </div>

        { rows }
      </div>
    )
  }
}

export class Quickbooks extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="report_quickbooks"
        endpoint={ `/api/reports/quickbooks` }
        component={ _Quickbooks }
      />
    )
  }
}