import React from 'react';
import { Link } from 'react-router';

import { ReduxForm, FormInput, Checkbox, ClassSelect, StateSelect, EventChecks, Radio } from '../../forms/components';
import ContentsView from '../../helpers/ContentsView/ContentsView';

export class Organization extends React.Component {
  render() {
    return (
      <div>
        <ReduxForm
          subStore="register_organization"
          submitEndpoint="/api/register/organization"
          submitMethod="POST"
        >
          <p className="lead">
            Let's start with the parent organization that organizes your unit(s).
          </p>

          <hr />

          <p>This is:</p>
          <Radio
            label="A middle or high school."
            name="is_school"
            value="true"
            checked
          />
          <Radio
            label="A university or independent performance group."
            name="is_school"
            value="false"
          />

          <hr />

          <p className="lead">
            Remember, these should be about your <strong>school or independent non-profit</strong>,
            not about the competing team itself.
          </p>

          <FormInput name="name" label="Organization Name" />
          <FormInput name="street" label="Street" />
          <FormInput name="city" label="City" />
          <StateSelect name="state" label="State" />
          <FormInput name="zip" label="ZIP" maxLength={ 5 } />

          <button name="submit" type="submit" className="btn btn-primary btn-block">
            Next
          </button>
        </ReduxForm>
      </div>
    )
  }
}

class _DirectRegistration extends React.Component {
  render() {
    if (!this.props.contents) {
      return <_Organization { ...this.props } />
    }

    let buttons = [ ];
    this.props.contents.map(org => {
      buttons.push(
        <div className="col-xs-12 col-sm-6" key={ org._id + '-div' }>
          <Link
            role="button"
            className="btn btn-block btn-secondary"
            to={ `/register/organization/${org._id}` }
            key={ org._id }
          >
            { org.name }
          </Link>
        </div>
      )
    })
    return (
      <div>
        <p className="lead">Register a new unit for:</p>

        <p></p>

        <div className="row">
          { buttons }
        </div>

        <p></p><hr /><p></p>

        <div className="offset-xs-1 col-xs-10">
          <Link
            role="button"
            className="btn btn-block btn-outline-success"
            to="/register/new"
          >
            Register a New Organization
          </Link>
        </div>
      </div>
    )
  }
}

export class DirectRegistration extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="register_dispatch"
        endpoint="/api/register/orgList"
        component={ _DirectRegistration }
      />
    )
  }
}

class _UnitTypes extends React.Component {
  render() {
    let options = [];
    this.props.contents.map(type => {
      options.push(
        <Radio
          label={ type.name }
          key={ type._id }
          name="unit_type"
          value={ type._id }
          formStore="register_unit"
        />
      );
    })

    return (
      <div>
        { options }
      </div>
    )
  }
}

export class Unit extends React.Component {
  render() {
    return (
      <div>
        <ReduxForm
          subStore="register_unit"
          submitEndpoint={ `/api/register/organization/${this.props.params.org}` }
          submitMethod="POST"
        >
          <p className="lead">
            The information here should be about a competing unit from your school or organization. If you
            have multiple teams from the same school, please use A/B or JV/Varsity designations to better
            indicate relative skill levels at a glance. You will be able to provide more creative names to be
            announced at shows through your Spiel Sheet.
          </p>

          <p>
            This unit is:
          </p>

          <ContentsView subStore="register_unit_types" endpoint="/api/unittypes" component={ _UnitTypes } />
          <FormInput name="name" label="Unit Name" />
          <Checkbox name="circuit_member" label="Join the Circuit?" inForm={ true } checked={ true } />

          <button name="submit" type="submit" className="btn btn-primary btn-block">
            Next
          </button>
        </ReduxForm>
      </div>
    )
  }
}

class _ClassBox extends React.Component {
  render() {
    return (
      <div>
        <ClassSelect
          name="competition_class"
          label="Class"
          unitType={ this.props.contents.unit_type }
          scholastic={ this.props.contents.scholastic }
          formStore="register_unit_details"
        />
      </div>
    )
  }
}

export class Details extends React.Component {
  render() {
    return (
      <div>
        <ReduxForm
          subStore="register_unit_details"
          submitEndpoint={ `/api/register/unit/${this.props.params.unit}` }
          submitMethod="POST"
        >
          <p className="lead">
            While most units should compete in the same class they finished last season in, you may choose
            the class you find most appropriate. Judges will confirm or recommend adjustments at Premiere
            events.
          </p>

          <ContentsView
            subStore="register_classes"
            endpoint={ `/api/register/unit/${this.props.params.unit}` }
            component={ _ClassBox }
          />
          <FormInput name="members" label="Member Count" />

          <button name="submit" type="submit" className="btn btn-primary btn-block">
            Next
          </button>
        </ReduxForm>
      </div>
    )
  }
}

class _EventBox extends React.Component {
  render() {
    return (
      <EventChecks
        formStore="register_unit_events"
        endpoint={ `/api/events/by_type/${this.props.contents.unit_type}` }
      />
    )
  }
}

export class EventRegistration extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="register_unit_events"
        fetchEndpoint={ `/api/units/${this.props.params.unit}/events` }
        submitEndpoint={ `/api/register/unit/${this.props.params.unit}/events` }
        submitMethod="POST"
      >
        <p className="lead">
          If you know which events you'd like to attend, you may select them now. Event registrations are editable until the Monday two weeks prior to the event's date.
        </p>

        <ContentsView
          subStore="register_unit_events"
          endpoint={ `/api/register/unit/${this.props.params.unit}` }
          component={ _EventBox }
        />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          Register Unit
        </button>
      </ReduxForm>
    )
  }
}

class _Confirmation extends React.Component {
  render() {
    return (
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="card card-block">
              <p className="card-text">
                This school or organization has more units.
              </p>
              <Link
                to={ `/register/organization/${this.props.contents.organization}` }
                className="btn btn-block btn-primary"
              >
                Register Another Unit
              </Link>
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 d">
            <div className="card card-block">
              <p className="card-text">
                I represent an additional organization or school.
              </p>
              <Link to="/register" className="btn btn-block btn-warning">
                Register Another Organization
              </Link>
            </div>
          </div>
        </div>
    )
  }
}

export class Confirm extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <p className="lead">You're all set.</p>
        </div>

        <ContentsView
          subStore="register_confirmation"
          endpoint={ `/api/register/unit/${this.props.params.unit}/confirm` }
          component={ _Confirmation }
        />

        <div className="row">
          <div className="offset-xs-1 col-xs-10 text-xs-center">
            <div className="row">
              <Link to="/" className="btn btn-outline-success btn-block btn-sm">
                Return to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}