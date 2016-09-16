import React from 'react';
import { Link } from 'react-router';

import ModelView from '../../helpers/ModelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';

import * as UnitForms from './UnitForms';
import UnitList from './UnitList';

import UnitEventsList from '../Event/UnitEventsList';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Units</h1>

        <UnitList endpoint="/api/units" />
      </div>
    )
  }
}

//class _AttendingEvents extends React.Component {
//  render() {
//    return (
//
//    )
//  }
//}

class _Show extends React.Component {
  render() {
    const unit = this.props.model;

    return (
      <div className="container-fluid model-info">
        <h1 className="page-header">{ unit.name }</h1>

        <div className="row">
          <Prop>Organization</Prop>
          <Val><Link to={ unit.organization.detailsUrl }>{ unit.organization.name }</Link></Val>
        </div>

        <div className="row">
          <Prop>Director</Prop>
          <Val><Link to={ unit.director.profileUrl }>{ unit.director.formattedName }</Link></Val>
        </div>

        <div className="row">
          <Prop>Unit Type</Prop>
          <Val>{ unit.unit_type.name }</Val>
        </div>

        <div className="row">
          <Prop>Class</Prop>
          <Val>{ unit.competition_class.formattedName }</Val>
        </div>

        { (unit.members ?
            <div className="row">
              <Prop>Member Count</Prop>
              <Val>{ (unit.members ? unit.members : 0) }</Val>
            </div> : null) }

        { (unit.notes ?
            <HasRole role={ UserRoles.EventDirector } className="row">
              <Prop>Notes</Prop>
              <Val>{ unit.notes }</Val>
            </HasRole> : null) }

        <p></p>

        <div className="row">
          <div className="card col-xs-12">
            <div className="card-header card-info">
              Attending Events
            </div>
            <div className="card-block">
              <UnitEventsList endpoint={ `/api/units/${unit.slug}/attending` } />
            </div>
          </div>
        </div>

        <HasRole role={ UserRoles.Administrator } className="row">
          <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
            <hr />
            <Link to={ `/units/${unit.slug}/edit` } className="btn btn-sm btn-outline-secondary btn-block">
              Edit Unit
            </Link>
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
        subStore="unit_show"
        endpoint={ `/api/units/${this.props.params.slug}` }
        component={ _Show }
      />
    )
  }
}

export class Edit extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Editing Unit</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <UnitForms.Edit slug={ this.props.params.slug } />
          </div>
        </div>
      </div>
    )
  }
}