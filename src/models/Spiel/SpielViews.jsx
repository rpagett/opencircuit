import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { authConnect } from '../../helpers/functions';
import { HasRole, UserRoles } from '../User/UserRoles';
import ModelView from '../../helpers/ModelView/ModelView';

import SpielList from './SpielList';
import * as SpielForm from './SpielForms';

export class Index extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Spiels</h1>

        <SpielList endpoint="/api/spiels" />
      </div>
    )
  }
}

class _Preview extends React.Component {
  render() {
    const unit_name = (this.props.unit_name ? this.props.unit_name : this.props.name);
    const show_title = (this.props.show_title ? this.props.show_title : '(show title)');
    const staff = (this.props.directors ? this.props.directors : '(director)');

    if (this.props.isLoading) {
      return (<center><strong><h4>Loading preview...</h4></strong></center>)
    }

    return (
      <div className="offset-xs-1 col-xs-10">
        <center><h6>(When unit crosses timeline)</h6></center>
        <center><h5>
          Ladies and Gentlemen, please welcome from
          <strong> { this.props.city }, { this.props.state }</strong>,
        </h5></center>
        <center><h3>{ unit_name }</h3></center>
        <center><h6>
          (at 1:30 of the interval time, or at the direction of the timing official)
        </h6></center>
        <center><h4>
          Performing their program, "{ show_title }",
        </h4></center>
        <center><strong><h3>
          { unit_name }
        </h3></strong></center>
        <center><h4>
          You may take the floor in competition!
        </h4></center>
        <center><strong><h6>( At the obvious conclusion of the program: )</h6></strong></center>
        <center><h4>
          Ladies and gentlemen, <strong>{unit_name}</strong>, under the direction
          of <strong>{ staff }</strong>!
        </h4></center>
        <center><h4>
          <strong>{ unit_name }</strong> hopes you enjoyed their program, entitled "{ show_title }".
        </h4></center>
        <center><h4>
          Hailing from <strong>{ this.props.city }, { this.props.state }</strong>,
        </h4></center>
        <center><h2><strong>{ unit_name }</strong></h2></center>
      </div>
    )
  }
}

const mapStateToPreviewProps = state => {
  return {
    name: state.form['spiel_edit'] && state.form['spiel_edit'].name,
    city: state.form['spiel_edit'] && state.form['spiel_edit'].city,
    state: state.form['spiel_edit'] && state.form['spiel_edit'].state,
    unit_name: state.form['spiel_edit'] && state.form['spiel_edit'].unit_name,
    show_title: state.form['spiel_edit'] && state.form['spiel_edit'].show_title,
    directors: state.form['spiel_edit'] && state.form['spiel_edit'].directors,
    isLoading: state.form.loading['spiel_edit']
  }
}

const Preview = connect(mapStateToPreviewProps, { })(_Preview);

export class Edit extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <h1 className="page-header">Editing Spiel</h1>
        <div className="row">
          <div className="offset-xs-1 col-xs-10">
            <SpielForm.Edit slug={ this.props.params.slug }/>
          </div>
        </div>
        <div className="row">
          <p></p>
          <hr />
          <p></p>
        </div>
        <div className="row">
          <Preview />
        </div>
      </div>
    )
  }
}
