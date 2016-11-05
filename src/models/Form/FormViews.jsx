import React from 'react';
import { Link, withRouter } from 'react-router';

import { fetchAPI, authConnect } from '../../helpers/functions';
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

class _Verify extends React.Component {
  submit() {
    fetchAPI(`/api/forms/verify/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.authUser.apiToken
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.props.router.push(res.redirect)
      })
      .catch(error => {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
  }

  cancel() {
    this.props.router.push('/');
  }

  render() {
    const url = process.env.BASE_URL + `/api/forms/submission/${this.props.params.id}`;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="pdf-header col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-8">
                <p className="pdf-text">Please verify that the form is correct.</p>
              </div>
              <div className="col-xs-6 col-sm-2">
                <button
                  role="button"
                  className="btn btn-sm btn-block btn-success"
                  onClick={ this.submit.bind(this) }
                >
                  Submit
                </button>
              </div>
              <div className="col-xs-6 col-sm-2">
                <button
                  role="button"
                  className="btn btn-sm btn-block btn-danger"
                  onClick={ this.cancel.bind(this) }
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <iframe
            src={ `http://docs.google.com/viewer?url=${url}&amp;embedded=true` }
            style={{ 'width': '100%', 'height': '100vh', 'border': 'none' }}
          />
        </div>
      </div>
    )
  }
}

export const Verify = withRouter(authConnect(_Verify));

class _Review extends React.Component {
  submit() {
    fetchAPI(`/api/forms/review/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.authUser.apiToken
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.props.router.push(res.redirect)
      })
      .catch(error => {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
  }

  reject() {
    fetchAPI(`/api/forms/review/${this.props.params.id}`, {
      credentials: 'same-origin',
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': this.props.authUser.apiToken
      }
    })
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.props.router.push(res.redirect)
      })
      .catch(error => {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
  }

  cancel() {
    this.props.router.push('/');
  }

  render() {
    const url = process.env.BASE_URL + `/api/forms/submission/${this.props.params.id}`;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="pdf-header col-xs-12">
            <div className="row">
              <div className="col-xs-12 col-sm-8">
                <p className="pdf-text">Please verify that the form is correct.</p>
              </div>
              <div className="col-xs-6 col-sm-2">
                <button
                  role="button"
                  className="btn btn-sm btn-block btn-success"
                  onClick={ this.submit.bind(this) }
                >
                  Approve
                </button>
              </div>
              <div className="col-xs-6 col-sm-2">
                <button
                  role="button"
                  className="btn btn-sm btn-block btn-danger"
                  onClick={ this.reject.bind(this) }
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <iframe
            src={ `http://docs.google.com/viewer?url=${url}&embedded=true` }
            style={{ 'width': '100%', 'height': '100vh', 'border': 'none' }}
          />
        </div>
      </div>
    )
  }
}

export const Review = withRouter(authConnect(_Review));

export class ReviewList extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Forms Needing Review</h1>

        <ObligatedUnitsList endpoint="/api/forms/review" />
      </div>
    )
  }
}