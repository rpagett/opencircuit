import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router';

import { authConnect } from '../../helpers/functions';
import { HasRole, UserRoles } from '../User/UserRoles';
import ModelView from '../../helpers/ModelView/ModelView';
import ContentsView from '../../helpers/ContentsView/ContentsView';
import { CircuitLogo } from '../../helpers/logos';

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

class Print extends React.Component {
  render() {
    const unit_name = (this.props.unit_name ? this.props.unit_name : this.props.name);
    const show_title = (this.props.show_title ? this.props.show_title : '(show title)');
    const staff = (this.props.directors ? this.props.directors : '(director)');

    return (
      <div className="offset-xs-1 col-xs-10">
        <center><CircuitLogo className="nav-logo" padding={ 0 }/></center>
        <center><h6>(When unit crosses timeline)</h6></center>
        <center><h5>
          Ladies and Gentlemen, please welcome from
          <strong> { this.props.city }, { this.props.state }</strong>,
        </h5></center>
        <center><h3>{ unit_name }</h3></center>
        <hr />
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
        <hr />
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

class _EventSpiels extends React.Component {
  render() {
    let rows = [ ];
    this.props.contents.map(unit => {
      rows.push(
        <div className="container-fluid spiel-box">
          <Print
            directors={ unit.spiel.directors }
            show_title={ unit.spiel.show_title }
            unit_name={ unit.spiel.unit_name }
            city={ unit.organization.city }
            state={ unit.organization.state }
            updated={ unit.spiel.updatedAt }
            key={ unit._id }
          />
        </div>
      )
    })

    return (
      <div>
        { rows }
      </div>
    )
  }
}

class NewPrint extends React.Component {
  render() {
    const unit_name = (this.props.unit_name ? this.props.unit_name : this.props.name);
    const show_title = (this.props.show_title ? this.props.show_title : '(show title)');
    const directors = (this.props.directors ? this.props.directors : '(director)');

    return (
      <div className="container content-container">
        <div className="row header-row">
          <div className="col-xs-offset-1 col-xs-5 vcenter">
            <h1 className="text-center">
              <strong>Spiel</strong>
            </h1>
            <h4 className="text-center">
              <small>Updated { this.props.updated }</small>
            </h4>
          </div>
          <div className="col-xs-5">
            <CircuitLogo className="img img-responsive center-block" />
          </div>
        </div>

        <div className="row">
          <hr />
        </div>

        <div className="card">
          <div className="card-header">
            When the Unit Crosses the Timeline
          </div>
          <div className="card-block">
            <div className="row unit-row" width="100%">
              <h4 className="text-center">
                Ladies and gentlemen, please welcome, from { this.props.city },
                { this.props.state },
              </h4>
              <h2 className="unit-name text-center">
                { unit_name }!
              </h2>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <i>At 1:30 or by Direction of the Timing Official</i>
          </div>
          <div className="card-block">
            <div className="row unit-row" width="100%">
              <h4 className="text-center">
                Performing their program <strong>"{ show_title }"</strong>,
              </h4>
              <h2 className="unit-name text-center">
                { unit_name },
              </h2>
              <h4 className="text-center">
                You may take the floor in competition!
              </h4>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            At the Obvious Conclusion of the Program
          </div>
          <div className="card-block">
            <div className="row unit-row" width="100%">
              <h4 className="text-center">
                Ladies and gentlemen, <strong>{ unit_name }</strong>,
                under the direction of <strong>{ directors }</strong>.
              </h4>

              <h4 className="text-center">
                <strong>{ unit_name }</strong> hopes you enjoyed their program,
                entitled <strong>"{ show_title }"</strong>.
              </h4>

              <h4 className="text-center">
                Hailing from <strong>{ this.props.city }, { this.props.state }</strong>,
              </h4>

              <h2 className="unit-name text-center">
                { unit_name }
              </h2>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export class EventSpiels extends React.Component {
  render() {
    return (
      <ContentsView
        subStore="event_spiels"
        endpoint={ `/api/events/${this.props.params.slug}/spiels` }
        component={ _EventSpiels }
        slug={ this.props.params.slug }
      />
    )
  }
}
