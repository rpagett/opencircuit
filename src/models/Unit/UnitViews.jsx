import React from 'react';
import { Link } from 'react-router';

import ModelView from '../../helpers/ModelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';

import * as UnitForms from './UnitForms';
import UnitList from './UnitList';

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


class _Show extends React.Component {
  static propTypes = {
    model: React.PropTypes.object
  }

  render() {
    const unit = this.props.model;

    return (
      <div className="container-fluid model-info">
        <h1 className="page-header">{ unit.name }</h1>

        <div className="row">
          <Prop>Parent Organization</Prop>
          <Val><Link to={ unit.organization.detailsUrl }>{ unit.organization.name }</Link></Val>
        </div>

        <div className="row">
          <Prop>Unit Type</Prop>
          <Val>{ unit.unit_type.name }</Val>
        </div>

        <div className="row">
          <Prop>Current Class</Prop>
          <Val>{ unit.competition_class.formattedName }</Val>
        </div>

        <div className="row">
          <Prop>Director</Prop>
          <Val><Link to={ unit.director.profileUrl }>{ unit.director.formattedName }</Link></Val>
        </div>

        <div className="row">
          <Prop>Member Count</Prop>
          <Val>{ (unit.members ? unit.members : 0) }</Val>
        </div>
      </div>
    )
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ModelView endpoint={ `/api/units/${ this.props.params.slug }` } component={ _Show } />
    )
  }
}