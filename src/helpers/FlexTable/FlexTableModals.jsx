import React from 'react';
import { ReduxForm } from '../../forms/components';

export class ConfirmDeletion extends React.Component {
  render() {
    return (
      <ReduxForm
        subStore="CONFIRM_DELETION"
        submitEndpoint={ this.props.endpoint }
        submitMethod="DELETE"
        inModal={ true }
      >
        <p className="lead">Are you sure you want to delete { this.props.name }?</p>

        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <button role="cancel" className="btn btn-danger btn-block">
              No!
            </button>
          </div>
          <div className="col-xs-12 col-sm-6">
            <button role="submit" type="submit" className="btn btn-success btn-block">
              Yes, Delete It
            </button>
          </div>
        </div>
      </ReduxForm>
    )
  }
}