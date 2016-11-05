import React from 'react';
import { connect } from 'react-redux';

import fetch from 'isomorphic-fetch';
import LoadingCube from '../../helpers/LoadingCube';

import { authConnect } from '../../helpers/functions';
import { ReduxForm, Radio, UnitSelect } from '../../forms/components';

/* TODO:
    * FormList, FormObligationList
    * Add Obligations to Unit schema
    Trigger modals from lists
    Manual assignment
    Auto-assign on form creation
    Auto-assign on unit creation
*/

class _CreateForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    }
  }
  updateText(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //onDrop(files) {
  onSubmit(e) {
    e && e.preventDefault();
    this.setState({ isLoading: true });

    let data = new FormData();
    data.append('file', this._file.files[0]);
    data.append('name', this.state.name);
    data.append('description', this.state.description);

    fetch('/api/forms', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Authorization': this.props.authUser.apiToken
      },
      body: data
    })
      .then(res => {
        this.setState({ isLoading: false })
        return res.json()
      })
      .then(res => {
        if (res.success == true) {
          this.props.markClosed();
        }
        else {
          console.log(res.error);
        }
      })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingCube show={ true } />
    }

    return (
      <div className="container-fluid">
        <form enctype="multipart/form-data">
          <div className="row"><strong>Form Name</strong></div>
          <div className="row">
            <input
              name="name"
              className="form-control"
              type="text"
              onChange={ this.updateText.bind(this) }
            />
          </div>

          <p></p>

          <div className="row"><strong>Form Purpose</strong></div>
          <div className="row">
            <textarea
              name="description"
              className="form-control"
              onChange={ this.updateText.bind(this) }
            />
          </div>
          <p></p>
          <div className="row">
            <input
              className="form-control"
              type="file"
              name="upload"
              ref={ c => this._file = c } />
            <p></p>
          </div>

          <div className="row">
            <button
              type="submit"
              role="submit"
              onClick={ this.onSubmit.bind(this) }
              className="btn btn-success btn-block"
            >
              Create Form
            </button>
            <p></p>
          </div>
        </form>
      </div>
    )
  }
}

export const CreateForm = authConnect(_CreateForm);

class _SubmitForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    }
  }

  onSubmit(e) {
    e && e.preventDefault();
    this.setState({ isLoading: true });

    let data = new FormData();
    data.append('file', this._file.files[0]);
    data.append('unit', this.props.unit._id);

    fetch('/api/forms/' + this.props.form._id, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Authorization': this.props.authUser.apiToken
      },
      body: data
    })
      .then(res => {
        this.setState({ isLoading: false })
        return res.json()
      })
      .then(res => {
        if (res.success == true) {
          this.props.markClosed();
        }
        else {
          console.log(res.error);
        }
      })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingCube show={ true } />
    }

    return (
      <div className="container-fluid">
        <form enctype="multipart/form-data">
          <div className="row">
            <input
              className="form-control"
              type="file"
              name="upload"
              accept="application/pdf, pdf"
              ref={ c => this._file = c } />
            <p></p>
          </div>

          <p></p>

          <div className="row">
            <div className="alert alert-warning col-xs-12">
              Please supply <strong>PDF</strong>s only.
            </div>
          </div>

          <div className="row">
            <button
              type="submit"
              role="submit"
              onClick={ this.onSubmit.bind(this) }
              className="btn btn-success btn-block"
            >
              Upload
            </button>
            <p></p>
          </div>
        </form>
      </div>
    )
  }
}

export const SubmitForm = authConnect(_SubmitForm);

export class AssignObligation extends React.Component {
  constructor() {
    super();

    this.state = {
      showIndividual: false
    }
  }

  setViewType(individual) {
    this.setState({
      showIndividual: individual
    })
  }

  render() {
    const header = (
      <div className="text-xs-center text-center">
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className={ (this.state.showIndividual ? 'btn btn-info' : 'btn btn-outline-info') }
            onClick={ this.setViewType.bind(this, true) }
          >
            Individual Units
          </button>
          <button
            type="button"
            className={ (!this.state.showIndividual ? 'btn btn-info' : 'btn btn-outline-info') }
            onClick={ this.setViewType.bind(this, false) }
          >
            Automatically
          </button>
        </div>
      </div>
    )

    if (this.state.showIndividual) {
      return (
        <div className="container-fluid">
          <div className="row">
            { header }
          </div>

          <div className="row">
            <p></p>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <ReduxForm
                subStore="form_assign_indiv"
                submitEndpoint={ `/api/forms/${this.props.form._id}/assign` }
                submitMethod="POST"
                inModal={ true }
              >
                <UnitSelect name="unit" />

                <button type="submit" className="btn btn-warning btn-block">
                  Assign Obligation
                </button>
              </ReduxForm>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="container-fluid">
          <div className="row">
            { header }
          </div>

          <div className="row">
            <p></p>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <ReduxForm
                subStore="form_assign_auto"
                fetchEndpoint={ `/api/forms/${this.props.form._id}/autoassign` }
                submitEndpoint={ `/api/forms/${this.props.form._id}/autoassign` }
                submitMethod="PATCH"
                inModal={ true }
              >
                <Radio name="category" value="all" label="All Units" />
                <Radio name="category" value="independent" label="Independent Units" />
                <Radio name="category" value="scholastic" label="Scholastic Units" />
                <Radio name="category" value="none" label="None" />

                <p><strong>Remember,</strong> this assigns retroactively as well as to all new units.</p>

                <button type="submit" className="btn btn-success btn-block">
                  Auto-Assign
                </button>
              </ReduxForm>
            </div>
          </div>
        </div>
      )
    }
  }
}