import React from 'react';
import { Link } from 'react-router';

import ModelView from '../../helpers/ModelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';

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

        <div className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <Link to="/events/new" className="btn btn-block btn-success-outline btn-sm">
              Create an Event
            </Link>
          </div>
        </div>
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

        <div className="row">
          <Prop>Facebook Page</Prop>
          <Val><a href={ event.facebook_url }>{ event.facebook_url }</a></Val>
        </div>

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
