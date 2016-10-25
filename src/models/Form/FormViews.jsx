import React from 'react';
import { Link } from 'react-router';

import FormList from './FormList';
import { LaunchModalButton } from '../../modals/SpawnableModal';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Forms</h1>

        <FormList endpoint="/api/forms" />

        <p></p>

        <hr />

        <div className="row">
          <LaunchModalButton
             className="btn btn-sm btn-outline-info"
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
    )
  }
}