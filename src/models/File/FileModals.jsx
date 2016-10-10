import React from 'react';
import Dropzone from 'react-dropzone';

import { fetchAPI } from '../../helpers/functions';
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

  onDrop(files) {
    this.setState({ isLoading: true });

    let data = new FormData();
    files.map(file => {
      data.append('upload', file);
    })
    data.append('filename', this.state.filename);

    const boundaryKey = Math.floor(Math.random() * 1E16);
    fetchAPI('/api/files', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        //'Accept': 'application/json',
        'Content-Type': 'multipart/form-data; boundary=---' + boundaryKey,
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
        <div className="row">
          <input name="filename" className="form-control" type="text" onChange={ this.updateText.bind(this) } />
        </div>
        <div className="row">
          <Dropzone
            className="dropzone"
            activeClassName="dropzone-active"
            onDrop={ this.onDrop.bind(this) }
          >
            <strong>Drag a file or click to open file picker.</strong>
          </Dropzone>
        </div>
      </div>
    )
  }
}