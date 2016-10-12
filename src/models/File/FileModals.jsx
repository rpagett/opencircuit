import React from 'react';
import Dropzone from 'react-dropzone';

import fetch from 'isomorphic-fetch';
import LoadingCube from '../../helpers/LoadingCube';

export class Upload extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    }
  }
  updateText(e) {
    this.setState({
      filename: e.target.value
    })
  }

  //onDrop(files) {
  onSubmit(e) {
    e && e.preventDefault();
    this.setState({ isLoading: true });

    let data = new FormData();
    data.append('file', this._file.files[0]);
    data.append('filename', this.state.filename);

    const boundaryKey = Math.floor(Math.random() * 1E16);
    fetch('/api/files', {
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
        <div className="row"><strong>File Name for Users</strong></div>
        <form enctype="multipart/form-data" ref="uploadForm">
          <div className="row">
            <input
              name="filename"
              className="form-control"
              type="text"
              onChange={ this.updateText.bind(this) }
            />
            <p></p>
          </div>
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