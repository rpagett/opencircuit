import React from 'react';
import { Link } from 'react-router';
import MaskedInput from 'react-input-mask';
import fetch from 'isomorphic-fetch';
import _ from 'lodash';

import LoadingCube from '../../helpers/LoadingCube';
import ModelView from '../../helpers/ModelView/ModelView';
import ContentsView from '../../helpers/ContentsView/ContentsView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';
import { ReduxForm, PerformanceTime } from '../../forms/components';

import EventList from './EventList';
import UnitsInEventList from '../Unit/UnitsInEventList';
import * as EventForms from './EventForms';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Events</h1>

        <EventList endpoint="/api/events" />

        <p></p>

        <hr />

        <p></p>

        <HasRole role={ UserRoles.Administrator } className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <Link to="/events/new" className="btn btn-block btn-success-outline btn-sm">
              Create an Event
            </Link>
          </div>
        </HasRole>
      </div>
    )
  }
}

export class New extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">New Event</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <EventForms.Edit creationForm={ true } />
          </div>
        </div>
      </div>
    )
  }
}

export class Edit extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Editing Event</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <EventForms.Edit slug={ this.props.params.slug } />
          </div>
        </div>
      </div>
    )
  }
}

class _Show extends React.Component {
  static propTypes = {
    model: React.PropTypes.object
  }

  render() {
    const event = this.props.model;

    return (
      <div className="container-fluid model-info">
        <h1 className="page-header">{ event.name }</h1>

        <div className="row">
          <Prop>Date and Time</Prop>
          <Val>{ event.formattedDate }</Val>
        </div>

        <div className="row">
          <Prop>Attendance Cap</Prop>
          <Val>{ event.attendance_cap }</Val>
        </div>

        {( event.facebook_url ?
          <div className="row">
            <Prop>Facebook Page</Prop>
            <Val><a href={ event.facebook_url }>{ event.facebook_url }</a></Val>
          </div> : <div></div> )}

        <div className="row">
          <Prop>Adult Tickets</Prop>
          <Val>${ event.adult_ticket_price }</Val>
        </div>

        <div className="row">
          <Prop>Youth Tickets</Prop>
          <Val>${ event.youth_ticket_price }</Val>
        </div>

        <hr />

        <div className="row">
          <Prop>Registration Is...</Prop>
          <Val>
            { (event.registration_closed ?
              <span className="text-danger">{' '}closed</span> :
              <span className="text-success">{' '}open</span>) }
          </Val>
        </div>

        { (!event.registration_closed && event.registration_autoclose ?
          <div className="row">
            <Prop>Autocloses On...</Prop>
            <Val>{ event.formattedRegistrationAutoclose }</Val>
          </div> : '') }

        <div className="row">
          <Prop>Critique Registration is...</Prop>
          <Val>
            { (event.critique_closed ?
              <span className="text-danger">closed</span> :
              <span className="text-success">open</span>) }
          </Val>
        </div>

        <HasRole role={ UserRoles.EventDirector }>
          <div className="row">
            <Prop>Notes</Prop>
            <Val>{ event.notes }</Val>
          </div>
        </HasRole>

        <HasRole role={ UserRoles.CircuitStaff }>
          <div className="row">
            <div className="card offset-xs-1 col-xs-10">
              <div className="card-header card-success">
                Staff Toolbox
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <Link to={ `/events/${event.slug}/times` } className="btn btn-block btn-primary">
                      Set Performance Times
                    </Link>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <Link to={ `/events/${event.slug}/lineup` } className="btn btn-block btn-primary">
                     Show Lineup
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12 col-sm-6">
                    <Link to={ `/spiels/event/${event.slug}` } className="btn btn-block btn-primary">
                      Spiels
                    </Link>
                  </div>
                  <div className="col-xs-12 col-sm-6">
                    <Link to={ `/events/${event.slug}/critique` } className="btn btn-block btn-primary">
                      Critique Schedule
                    </Link>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xs-12">
                    <Link to={ `/events/${event.slug}/registration` } className="btn btn-block btn-secondary">
                      Registration Worksheet
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HasRole>

        { (event.confirmedUnits ?
          <div>
            <div className="row">
              <hr />
            </div>

            <div className="row">
              <div className="card col-xs-12">
                <div className="card-header card-success">
                  Confirmed Units
                </div>
                <div className="card-block">
                  <UnitsInEventList name="event_confirmed_units" contents={ event.confirmedUnits } />
                </div>
              </div>
            </div>
          </div> : null) }

        { (event.waitlistUnits.length ?
          <div>
            <div className="row">
              <div className="card col-xs-12">
                <div className="card-header card-warning">
                  Units on Waitlist
                </div>
                <div className="card-block">
                  <UnitsInEventList name="event_waitlist_units" contents={ event.waitlistUnits } />
                </div>
              </div>
            </div>
          </div> : null) }

        { (event.unpaidUnits.length ?
          <div>
            <div className="row">
              <div className="card col-xs-12">
                <div className="card-header card-danger">
                  Units Awaiting Payment
                </div>
                <div className="card-block">
                  <UnitsInEventList name="event_unpaid_units" contents={ event.unpaidUnits } />
                </div>
              </div>
            </div>
          </div> : null) }

        <HasRole role={ UserRoles.EventDirector }>
          <div className="row">
            <hr />
          </div>

          <div className="row">
            <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
              <Link to={ `/events/${event.slug}/edit` } className="btn btn-sm btn-outline-secondary btn-block">
                Edit Event
              </Link>
            </div>
          </div>
        </HasRole>

      </div>
    )
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ModelView
        subStore="event_show"
        endpoint={ `/api/events/${ this.props.params.slug }` }
        component={ _Show }
      />
    )
  }
}

class _Times extends React.Component {
  render() {
    const regs = this.props.contents;
    let rows = [ ];

    regs.map(reg => {
      rows.push(
        <PerformanceTime key={ reg.unit._id } label={ reg.unit.name } name={ `performance_time.${reg.unit._id}` } value={ reg.performance_time } />
      )
    })
    return (
      <div className="container-fluid">
        <h1 className="page-header">Performance Times</h1>

        <ReduxForm
          subStore="event_perftimes"
          fetchEndpoint={ `/api/events/${this.props.slug}/times`}
          submitEndpoint={ `/api/events/${this.props.slug}/times` }
          submitMethod="PATCH"
        >
          { rows }

          <button type="submit" role="submit" className="btn btn-success btn-block">Submit</button>
        </ReduxForm>
      </div>
    )
  }
}

export class Times extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="event_times"
        endpoint={ `/api/events/${this.props.params.slug}/lineup` }
        component={ _Times }
        slug={ this.props.params.slug }
      />
    )
  }
}

class _Lineup extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(reg => {
      rows.push(
        <tr key={ reg._id }>
          <td key={ reg._id + '-name'}>{ reg.unit.name }</td>
          <td key={ reg._id + '-fname' }>{ reg.unit.director.formattedName }</td>
          <td key={ reg._id + '-spiel'}>{ (reg.unit.spiel ? reg.unit.spiel.show_title : 'No Spiel') }</td>
          <td key={ reg._id + '-class'}>{ reg.unit.competition_class.abbreviation.toUpperCase() }</td>
          <td key={ reg._id + '-time'}>{ reg.performance_time }</td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="page-header">Lineup</h1>
        <div className="container-fluid">
          <table className="table table-responsive">
            <thead>
              <tr>
                <th><strong>Unit</strong></th>
                <th><strong>Director</strong></th>
                <th><strong>Title</strong></th>
                <th><strong>Class</strong></th>
                <th><strong>Time</strong></th>
              </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Lineup extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="event_lineup"
        endpoint={ `/api/events/${this.props.params.slug}/lineup` }
        component={ _Lineup }
        slug={ this.props.params.slug }
      />
    )
  }
}

class _Critique extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(reg => {
      rows.push(
        <tr key={ reg._id }>
          <td key={ reg._id + '-name'}>{ reg.unit.name }</td>
          <td key={ reg._id + '-fname'}>{ reg.unit.director.formattedName }</td>
          <td key={ reg._id + '-title'}>{ reg.unit.spiel.show_title }</td>
          <td key={ reg._id + '-class'}>{ reg.unit.competition_class.abbreviation.toUpperCase() }</td>
          <td key={ reg._id + '-time'}>{ reg.performance_time }</td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="page-header">Attending Critique</h1>
        <div className="container-fluid">
          <table className="table table-responsive">
            <thead>
            <tr>
              <th><strong>Unit</strong></th>
              <th><strong>Director</strong></th>
              <th><strong>Title</strong></th>
              <th><strong>Class</strong></th>
              <th><strong>Perf. Time</strong></th>
            </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Critique extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="event_critique"
        endpoint={ `/api/events/${this.props.params.slug}/critique` }
        component={ _Critique }
        slug={ this.props.params.slug }
      />
    )
  }
}

class _Registration extends React.Component {
  render() {
    let rows = [ ];

    this.props.contents.map(reg => {
      let missing = _.filter(reg.unit.form_obligations, o => {
        return o.submitted != true;
      });
      missing = _.map(missing, o => o.form.name);
      missing = _.join(missing, ', ');

      rows.push(
        <tr key={ reg._id }>
          <td key={ reg._id + '-name'}>{ reg.unit.name }</td>
          <td key={ reg._id + '-director'}>{ reg.unit.director.formattedName }</td>
          <td key={ reg._id + '-time'}>{ reg.performance_time }</td>
          <td key={ reg._id + '-staff'}>{ (reg.unit.plus_pass ? 12 : 7) }</td>
          <td key={ reg._id + '-members'}>{ reg.unit.members }</td>
          <td key={ reg._id + '-notes'}>{ missing }</td>
        </tr>
      )
    })

    return (
      <div>
        <h1 className="page-header">Registration Worksheet</h1>
        <div className="container-fluid">
          <table className="table table-responsive">
            <thead>
            <tr>
              <th><strong>Unit</strong></th>
              <th><strong>Director</strong></th>
              <th><strong>Perf. Time</strong></th>
              <th><strong>Staff</strong></th>
              <th><strong>Members</strong></th>
              <th><strong>Notes</strong></th>
            </tr>
            </thead>
            <tbody>
              { rows }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export class Registration extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="event_registration"
        endpoint={ `/api/events/${this.props.params.slug}/registration` }
        component={ _Registration }
        slug={ this.props.params.slug }
      />
    )
  }
}
