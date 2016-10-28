import React from 'react';
import { Link } from 'react-router';

import { LaunchModalButton } from '../../modals/SpawnableModal';
import { HasRole, UserRoles } from '../User/UserRoles';
import ModelView from '../../helpers/ModelView/ModelView';

import FormList from './FormList';
import ObligatedUnitsList from './ObligatedUnitsList';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Forms</h1>

        <FormList endpoint="/api/forms" />

        <HasRole role={ UserRoles.Administrator }>
          <div className="row">
            <hr />
          </div>

          <div className="row">
            <div className="pull-xs-center col-xs-12 offset-sm-4 col-sm-4">
              <LaunchModalButton
                className="btn btn-sm btn-outline-secondary btn-block"
                buttonText="Create Form"

                title="Create Form"
                componentName="FORM_CREATE_FORM"
                modalProps={{
                  refreshTable: 'formList',
                  refreshEndpoint: '/api/forms'
                }}
              />
            </div>
          </div>
        </HasRole>
      </div>
    )
  }
}

export class View extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Obligated Units</h1>

        <ObligatedUnitsList endpoint={ `/api/forms/${this.props.params.form_id}/assign` } />
      </div>
    )
  }
}