import React from 'react';
import { Link } from 'react-router';

import ContentsView from '../../helpers/ContentsView/ContentsView'
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
      </div>
    )
  }
}

export class New extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">New Competitive Class</h1>
        <div className="row">
          <div className="col-sm-offset-1 col-sm-10">
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
          <div className="col-sm-offset-1 col-sm-10">
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
        <h1 className="page-header">Units in { this.props.contents.formattedName }</h1>

        <UnitList endpoint={ `/api/compclasses/${this.props.contents._id}/units` } />
      </div>
    )
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="compclass_show"
        endpoint={ `/api/compclasses/${this.props.params.abbreviation}` }
        component={ _Show }
      />
    );
  }
}
