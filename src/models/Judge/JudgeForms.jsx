import React from 'react';

import { ReduxForm, FormInput, TextArea, DateTime, Radio, PhoneInput, StateSelect, DaypartSelect, FormStatic } from '../../forms/components';

export class Edit extends React.Component {
  render() {
    let fetch = { }

    if (this.props.creationForm) {
      fetch.submitEndpoint = '/api/judges';
      fetch.submitMethod = 'POST';
    }
    else {
      fetch.submitEndpoint = `/api/judges/${this.props.email}`;
      fetch.fetchEndpoint = `/api/judges/${this.props.email}`;
      fetch.submitMethod = 'PATCH';
    }

    return (
      <ReduxForm
        subStore="judge_edit"
        { ...fetch }
      >
        { (this.props.creationForm ?
          <div>
            <FormInput name="email" label="Email" />
            <p><strong>Gender:</strong></p>
            <Radio name="gender" value="male" label="Male" />
            <Radio name="gender" value="female" label="Female" />
            <p></p>
            <DateTime name="dob" label="Date of Birth" />
          </div>
            :
          <FormStatic name="email" label="Email" />
        ) }
        <FormInput name="first_name" label="First Name"/>
        <FormInput name="middle_initial" label="Middle Initial" />
        <FormInput name="last_name" label="Last Name" />
        <PhoneInput name="phone" label="Phone" />
        <FormInput name="street" label="Street" />
        <FormInput name="address_2" label="Address 2" />
        <FormInput name="city" label="City" />
        <StateSelect name="state" label="State" />
        <FormInput name="zip" label="ZIP" />

        <p></p>

        <FormInput name="ff_airline" label="Frequent Flier Airline" />
        <FormInput name="ff_number" label="Frequent Flier Number" />
        <FormInput name="airport" label="Nearest/Preferred Airport" />
        <FormInput name="TSA_precheck" label="TSA Precheck #" />

        <p></p>

        <DaypartSelect name="friday_departure" label="Pref. Friday Departure" />
        <DaypartSelect name="sunday_departure" label="Pref. Sunday Departure" />

        <p></p>

        <TextArea name="bio" label="Bio" />
        <TextArea name="dietary_needs" label="Dietary Needs" />
        <TextArea name="comments" label="Comments" />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          Save Changes
        </button>
      </ReduxForm>
    )
  }
}