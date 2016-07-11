import React from 'react';
import { ReduxForm, FormInput, FormStatic, Checkbox, DateTime, TextArea } from '../../forms/components';

export class Edit extends React.Component {
  render() {
    let fetch = { };

    if (this.props.creationForm) {
      fetch.submitEndpoint = `/api/events`;
      fetch.submitMethod = 'POST';
    }
    else {
      fetch.submitEndpoint = `/api/events/${this.props.slug}`;
      fetch.fetchEndpoint = `/api/events/${this.props.slug}`;
      fetch.submitMethod = 'PATCH';
    }

    return (
      <ReduxForm
        subStore="event_edit"
        { ...fetch }
      >
        <FormInput name="name" label="Name" />
        <DateTime name="date" label="Date and Time" />
        <FormInput type="url" name="facebook_url" label="Facebook Event URL" />

        <hr />

        <FormInput type="number" name="attendance_cap" label="Attendance Cap" />
        <Checkbox inForm={ true } name="registration_closed" label="Registration Closed?" />
        <DateTime name="registration_autoclose" label="Auto-close On..." />

        <hr />

        <FormInput type="number" beforeInput="$" name="adult_ticket_price" label="Adult Tickets" />
        <FormInput type="number" beforeInput="$" name="youth_ticket_price" label="Youth Tickets" />

        <hr />

        <TextArea name="notes" label="Administrative Notes" />

        <Checkbox inForm={ true } name="critique_closed" label="Critique Registration Closed?" />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          {( this.props.creationForm ? 'Create Event' : 'Save Changes' )}
        </button>
      </ReduxForm>
    )
  }
}