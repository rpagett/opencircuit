import React from 'react';
import { Link } from 'react-router';

import JudgeList from './JudgeList';
import * as JudgeForms from './JudgeForms';

import ModelView from '../../helpers/ModelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';
import TranslateDaypart from '../../helpers/dayparts';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Judges</h1>

        <p></p>

        <JudgeList endpoint="/api/judges" />

        <p></p>
        <hr />
        <p></p>

        <div className="row">
          <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
            <Link to="/judges/new" className="btn btn-sm btn-outline-secondary btn-block">
              New Judge
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

class _Show extends React.Component {
  render() {
    const judge = this.props.model;

    return (
      <div className="container-fluid model-info">
        <h1 className="page-header">{ judge.formattedName }</h1>

        <div className="row">
          <Prop>Email</Prop>
          <Val><a href={ `mailto:${judge.email}` }>{ judge.email }</a></Val>
        </div>

        <div className="row">
          <Prop>Phone</Prop>
          <Val>{ judge.phone }</Val>
        </div>

        <div className="row">
          <Prop>Address</Prop>
          <Val>
            { judge.street }<br />
            { (judge.address_2 ? judge.address_2 : '') }
            { judge.city }, { judge.state } { judge.zip }
          </Val>
        </div>

        <div className="row">
          <Prop>ID</Prop>
          <Val>{ judge.gender }, born { judge.dob }</Val>
        </div>

        { (judge.ff_airline ?
          <div className="row">
            <Prop>Frequent Flier</Prop>
            <Val>{ judge.ff_airline }, #{ judge.ff_number }</Val>
          </div> : null) }

        <div className="row">
          <Prop>Airport</Prop>
          <Val>{ judge.airport }</Val>
        </div>

        { (judge.TSA_precheck ?
          <div className="row">
            <Prop>TSA Precheck #</Prop>
            <Val>{ judge.TSA_precheck }</Val>
          </div> : null) }

        <div className="row">
          <Prop>Departures</Prop>
          <Val>
            Friday - { TranslateDaypart(judge.friday_departure) }<br />
            Sunday - { TranslateDaypart(judge.sunday_departure) }
          </Val>
        </div>

        { (judge.dietary_needs ?
          <div className="row">
            <Prop>Dietary Needs</Prop>
            <Val>{ judge.dietary_needs }</Val>
          </div> : null) }

        <div className="row">
          <Prop>Bio</Prop>
          <Val>{ judge.bio }</Val>
        </div>

        <div className="row">
          <Prop>Comments</Prop>
          <Val>{ judge.comments }</Val>
        </div>

        <div className="row">
          <hr />
        </div>

        <div className="row">
          <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
            <Link to={ `/judges/${judge.email}/edit` } className="btn btn-sm btn-outline-secondary btn-block">
              Edit Judge
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ModelView
        subStore="judge_show"
        endpoint={ `/api/judges/${ this.props.params.email }` }
        component={ _Show }
      />
    );
  }
}

export class New extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">New Judge Record</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <JudgeForms.Edit creationForm={ true } />
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
        <h1 className="page-header">Editing Judge Record</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <JudgeForms.Edit email={ this.props.params.email } />
          </div>
        </div>
      </div>
    )
  }
}