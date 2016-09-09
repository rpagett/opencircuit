import React from 'react';
import { Link } from 'react-router';

import ModelView from '../../helpers/ModelView/ModelView'
import { UserRoles, HasRole } from '../User/UserRoles';

import UnitList from '../Unit/UnitList';
import CompClassList from './CompClassList';
import * as CompClassForms from './CompClassForms';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Competitive Classes</h1>

        <CompClassList endpoint="/api/compclasses" />

        <div className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <Link to="/compclasses/new" className="btn btn-block btn-success-outline btn-sm">
              Add a New Class
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
        <h1 className="page-header">New Class</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <CompClassForms.Edit creationForm={ true } />
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
        <h1 className="page-header">Editing Competitive Class</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <CompClassForms.Edit abbreviation={ this.props.params.abbreviation } />
          </div>
        </div>
      </div>
    )
  }
}

class _Show extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Units in { this.props.model.formattedName }</h1>

        <UnitList endpoint={ `/api/compclasses/${this.props.model._id}/units` } />
      </div>
    )
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ModelView
        subStore="compclass_show"
        endpoint={ `/api/compclasses/${this.props.params.abbreviation}` }
        component={ _Show }
      />
    );
  }
}
