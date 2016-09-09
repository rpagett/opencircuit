import React from 'react';
import { Link } from 'react-router';

import ContentsView from '../../helpers/ContentsView/ContentsView';
import * as UnitTypeForms from './UnitTypeForms';
import UnitList from '../Unit/UnitList';
import UnitTypeList from './UnitTypeList';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Unit Types</h1>

        <UnitTypeList endpoint="/api/unittypes/table" />

        <div className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <Link to="/unittypes/new" className="btn btn-block btn-outline-success btn-sm">
              Add a New Unit Type
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
        <h1 className="page-header">New Unit Type</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <UnitTypeForms.Edit creationForm={ true } />
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
        <h1 className="page-header">Editing Unit Type</h1>
        <div className="row">
          <div className="offset-sm-1 col-sm-10">
            <UnitTypeForms.Edit slug={ this.props.params.slug } />
          </div>
        </div>
      </div>
    )
  }
}

class _Show extends React.Component {
  render() {
    const type = this.props.contents;

    return (
      <div>
        <h1 className="page-header">{ type.name } Units</h1>

        <UnitList endpoint={ `/api/unittypes/${type.slug}/units` } />
      </div>
    )
  }
}

export class Show extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="unittype_show"
        endpoint={ `/api/unittypes/${this.props.params.slug}` }
        component={ _Show }
      />
    )
  }
}
