import React from 'react';
import Dropbox from 'dropbox';
import fetch from 'isomorphic-fetch';
import Moment from 'moment';

import { ReduxForm, ClassSelect } from '../../forms/components';
import LoadingCube from '../../helpers/LoadingCube';

export class Reclassify extends React.Component {
  render() {
    const unit = this.props.unit;

    return (
      <ReduxForm
        subStore="unit_reclassify"
        submitEndpoint={ `/api/units/${unit._id}/reclassify` }
        submitMethod="PATCH"
        inModal={ true }
      >
        <ClassSelect
          name="compclass"
          unitType={ unit.unit_type._id }
          scholastic={ unit.organization.is_school }
        />

        <button className="btn btn-success btn-block">
          Change Class
        </button>
      </ReduxForm>
    )
  }
}

export class UploadMusic extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    }
  }

  uploadFile(e) {
    function deriveFileExtension(fname) {
      return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
    }

    e && e.preventDefault();
    this.setState({
      isLoading: true,
      uploadMessage: true,
    });

    const ACCESS_TOKEN = 'U2Me9Hub8LAAAAAAAAAACNoxSNS_iNDYKb0AVbenYGaKDdOwRL5tKGfXL-mACAEm';
    const dbx = new Dropbox({ accessToken: ACCESS_TOKEN });
    const file = this._file.files[0];

    if (!file) {
      this.setState({
        isLoading: false,
        uploadMessage: false
      })
      return false;
    }

    dbx.filesUpload({path: '/' + this.props.unit.name +
      '--' + Moment(Date.now()).format('MMM-Do-YYYY--h-mm-a') +
      '.' + deriveFileExtension(file.name), contents: file})
      .then(res => {
        const data = new FormData();
        data.append('modified', res.client_modified);

        return fetch(`/api/units/${this.props.unit.slug}/music`, {
          credentials: 'same-origin',
          method: 'PATCH',
          headers: {
            'Authorization': this.props.user.apiToken
          },
          body: data
        })
      })
      .then(res => {
        this.setState({
          isLoading: false,
          uploadMessage: false
        })
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
      .catch(err => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <LoadingCube show={ true } />
          { (this.state.uploadMessage ? <center><strong>Uploading...</strong></center> : null) }
        </div>
      )
    }

    return (
      <div className="container-fluid">
        <form enctype="multipart/form-data" ref="uploadForm">
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
              onClick={ this.uploadFile.bind(this) }
              className="btn btn-success btn-block"
            >
              Submit
            </button>
            <p></p>
          </div>
        </form>
      </div>
    )
  }
}

export class RemoveCritique extends React.Component {
  render() {
    const reg = this.props.reg;

    return (
      <div>
        <ReduxForm
          subStore="unit_remove_critique"
          submitEndpoint={ `/api/units/${reg.unit.slug}/critique/${this.props.event._id}` }
          submitMethod="DELETE"
          inModal={ true }
        >
          Are you sure you'd like to remove <strong>{ reg.unit.name }</strong> from critique at
          <strong> { this.props.event.name }</strong>?

          <button type="submit" role="submit" className="btn btn-danger btn-block">
            Confirm
          </button>
        </ReduxForm>
      </div>
    )
  }
}

export class RegisterCritique extends React.Component {
  render() {
    const reg = this.props.reg;

    return (
      <div>
        <ReduxForm
          subStore="unit_register_critique"
          submitEndpoint={ `/api/units/${reg.unit.slug}/critique/${this.props.event._id}` }
          submitMethod="POST"
          inModal={ true }
        >
          <p>
            Are you sure you'd like to register <strong>{ reg.unit.name }</strong> for critique at
            <strong> { this.props.event.name }</strong>?
          </p>

          <p>
            Units which register for critique and do not attend the session will be disqualified from
            critique for the remainder of the competitive season.
          </p>

          <button type="submit" role="submit" className="btn btn-success btn-block">
            Confirm
          </button>
        </ReduxForm>
      </div>
    )
  }
}