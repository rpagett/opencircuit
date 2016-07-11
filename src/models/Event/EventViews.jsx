import React from 'react';

import ModelView from '../../modelView/ModelView';
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
          <div className="col-sm-offset-1 col-sm-10">
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
          <div className="col-sm-offset-1 col-sm-10">
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
      <div>
        Showing event { event.name }!
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
