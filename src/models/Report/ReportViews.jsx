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
          <li><Link to="/reports/drawstatus">Draw Status</Link></li>
          <li><Link to="/reports/mailchimp">Mailchimp</Link></li>
          <li><Link to="/reports/music">Music</Link></li>
          <li><Link to="/reports/quickbooks">Quickbooks</Link></li>
          <li><Link to="/reports/spiels">Spiels</Link></li>
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
          <div className="col-xs-3">{ date.format('MMM. Do, YYYY h:mm a') }</div>
          <div className="col-xs-3">{ Moment(unit.confirmed_paid_date).format('MMM. Do, YYYY h:mm a') }</div>
        </div>
      )
    })

    return (
      <div>
        <h1 className="page-header">Units by Registration Date</h1>

        <div className="row">
          <div className="offset-xs-1 col-xs-5"><strong>Unit</strong></div>
          <div className="col-xs-3"><strong>Registration Date</strong></div>
          <div className="col-xs-3"><strong>Paid Date</strong></div>
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

class _DrawStatus extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(unit => {
      rows.push(
        <div className="row">
          <div className="offset-xs-1 col-xs-4">{ unit.name }</div>
          <div className="col-xs-3">{ unit.director.formattedName }</div>
          <div className={ `col-xs-4 ${unit.paymentClass}` }>{ unit.paymentStatus }</div>
        </div>
      )
    })

    return (
      <div>
        <h1 className="page-header">Draw Status Report</h1>

        <div className="row">
          <div className="offset-xs-1 col-xs-4"><strong>Unit</strong></div>
          <div className="col-xs-3"><strong>Director</strong></div>
          <div className="col-xs-4"><strong>Payment</strong></div>
        </div>

        { rows }
      </div>
    )
  }
}

export class DrawStatus extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="report_drawstatus"
        endpoint={ `/api/reports/drawstatus` }
        component={ _DrawStatus }
      />
    )
  }
}

class _MailChimp extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(unit => {
      rows.push(
        <tr key={ unit._id }>
          <td key={ unit._id + 'a' }>{ unit.name }</td>
          <td key={ unit._id + 'b' }>{ unit.director.first_name }</td>
          <td key={ unit._id + 'c' }>{ unit.director.last_name }</td>
          <td key={ unit._id + 'd' }>{ unit.director.email }</td>
          <td key={ unit._id + 'e' }>{ unit.director.phone }</td>
          <td key={ unit._id + 'f' }>{ unit.organization.street }</td>
          <td key={ unit._id + 'g' }>{ unit.organization.street_2 }</td>
          <td key={ unit._id + 'h' }>{ unit.organization.city }</td>
          <td key={ unit._id + 'i' }>{ unit.organization.state }</td>
          <td key={ unit._id + 'j' }>{ unit.organization.zip }</td>
          <td key={ unit._id + 'k' }>{ unit.organization.name }</td>
          <td key={ unit._id + 'l' }>{ unit.unit_type.name }</td>
          <td key={ unit._id + 'm' }>{ unit.competition_class.name }</td>
          <td key={ unit._id + 'n' }>{ unit.eventList }</td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="page-header">MailChimp CSV</h1>

        <table className="table">
          <thead>
            <tr>
              <th>Unit</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Street</th>
              <th>Street 2</th>
              <th>City</th>
              <th>State</th>
              <th>ZIP</th>
              <th>Organization</th>
              <th>Unit Type</th>
              <th>Class</th>
              <th>Events</th>
            </tr>
          </thead>

          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}

export class MailChimp extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="report_mailchimp"
        endpoint={ `/api/reports/mailchimp` }
        component={ _MailChimp }
      />
    )
  }
}

class _Music extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(unit => {
      rows.push(
        <tr key={ unit._id + '_row' }>
          <td key={ unit._id + '_name' }>{ unit.name }</td>
          <td key={ unit._id + '_class' }>{ unit.competition_class.abbreviation.toUpperCase() }</td>
          <td key={ unit._id + '_director' }>{ unit.director.formattedName }</td>
          <td key={ unit._id + '_email' }>{ unit.director.email }</td>
          <td key={ unit._id + '_status' }>
            { ( unit.last_music_submission ? Moment(unit.last_music_submission).format('MMM. Do, YYYY [at] h:mm a') : 'None' ) }
          </td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="page-header">Music Status Report</h1>

        <table>
          <thead>
          <tr>
            <th><strong>Unit</strong></th>
            <th><strong>Class</strong></th>
            <th><strong>Director</strong></th>
            <th><strong>Email</strong></th>
            <th><strong>Music Status</strong></th>
          </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}

export class Music extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="report_music"
        endpoint={ `/api/reports/music` }
        component={ _Music }
      />
    )
  }
}

class _Spiels extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(unit => {
      rows.push(
        <tr key={ unit._id + '_row' }>
          <td key={ unit._id + '_name' }>{ unit.name }</td>
          <td key={ unit._id + '_class' }>{ unit.competition_class.abbreviation.toUpperCase() }</td>
          <td key={ unit._id + '_director' }>{ unit.director.formattedName }</td>
          <td key={ unit._id + '_email' }>{ unit.director.email }</td>
          <td key={ unit._id + '_status' }>
            { ( unit.spiel ? Moment(unit.spiel.updatedAt).format('MMM. Do, YYYY [at] h:mm a') : 'Never' ) }
          </td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="page-header">Spiel Status Report</h1>

        <table>
          <thead>
            <tr>
              <th><strong>Unit</strong></th>
              <th><strong>Class</strong></th>
              <th><strong>Director</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>Last Spiel Update</strong></th>
            </tr>
          </thead>
          <tbody>
            { rows }
          </tbody>
        </table>
      </div>
    )
  }
}

export class Spiels extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="report_spiels"
        endpoint={ `/api/reports/spiels` }
        component={ _Spiels }
      />
    )
  }
}