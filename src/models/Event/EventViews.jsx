import React from 'react';
import { Link } from 'react-router';

import ModelView from '../../helpers/modelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';

import EventList from './EventList';
import * as EventForms from './EventForms';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Events</h1>

        <EventList endpoint="/api/events" />
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
          <div>
            <div className="row">
              <Prop>Notes</Prop>
              <Val>{ event.notes }</Val>
            </div>

            <hr />

            <div className="row">
              <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
                <Link to={ `/events/${event.slug}/edit` } className="btn btn-sm btn-outline-secondary btn-block">
                  Edit Event
                </Link>
              </div>
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
      <ModelView endpoint={ `/api/events/${ this.props.params.slug }` } component={ _Show } />
    )
  }
}
