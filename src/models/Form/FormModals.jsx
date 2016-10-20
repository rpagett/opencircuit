import React from 'react';

import fetch from 'isomorphic-fetch';
import LoadingCube from '../../helpers/LoadingCube';

import { ReduxForm, Radio } from '../../forms/components';

/* TODO:
    * FormList, FormObligationList
    Add Obligations to Unit schema
    Trigger modals from lists
    Manual assignment
    Auto-assign on form creation
    Auto-assign on unit creation
*/

export class CreateForm extends React.Component {
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
    data.append('name', this.state.filename);
    data.append('description', this.state.description);

    fetch('/api/forms', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Authorization': this.props.user.apiToken
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

export class SubmitForm extends React.Component {
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

    fetch('/api/forms/' + this.props.formId, {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Authorization': this.props.user.apiToken
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
          <div className="row"><strong>Submit Form</strong></div>
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
              Upload
            </button>
            <p></p>
          </div>
        </form>
      </div>
    )
  }
}