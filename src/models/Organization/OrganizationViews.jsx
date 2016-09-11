import React from 'react';
import { Link } from 'react-router';


import * as OrganizationForms  from './OrganizationForms';
import OrganizationList from './OrganizationList';

import ModelView from '../../helpers/ModelView/ModelView';
import { Prop, Val } from '../../layout/ModelInfo';
import { UserRoles, HasRole } from '../User/UserRoles';
import UnitList from '../Unit/UnitList';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Organizations</h1>

        <OrganizationList endpoint="/api/organizations" />
      </div>
    )
  }
}

class _Show extends React.Component {
  render() {
    const organization = this.props.model;

    return (
      <div className="container-fluid model-info">
        <h1 className="page-header">{ organization.name }</h1>

        <div className="row">
          <Prop>Director</Prop>
          <Val><Link to={ organization.director.profileUrl }>{ organization.director.formattedName }</Link></Val>
        </div>

        <div className="row">
          <Prop>Address</Prop>
          <Val>
            { organization.street }<br />
            { ( organization.street_2 ? organization.street_2 : null) }
            { ( organization.street_2 ? <br /> : null) }
            { organization.city }, { organization.state } { organization.zip }
          </Val>
        </div>

        <p></p>

        <div className="row">
          <div className="card col-xs-12">
            <div className="card-header card-info">
              Units
            </div>
            <div className="card-block">
              <UnitList endpoint={ `/api/organizations/${organization.slug}/units` } />
            </div>
          </div>
        </div>

        <HasRole role={ UserRoles.Administrator } className="row">
          <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
            <hr />
            <Link
              to={ `/organizations/${organization.slug}/edit` }
              className="btn btn-sm btn-outline-secondary btn-block"
            >
              Edit Organization
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
        subStore="organization_show"
        endpoint={ `/api/organizations/${this.props.params.slug}` }
        component={ _Show }
      />
    )
  }
}

export class Edit extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Editing Organization</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <OrganizationForms.Edit slug={ this.props.params.slug } />
          </div>
        </div>
      </div>
    )
  }
}