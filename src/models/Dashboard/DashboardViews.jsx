import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Moment from 'moment';
import _ from 'lodash';

import ContentsView from '../../helpers/ContentsView/ContentsView';
import { LaunchModalButton } from '../../modals/SpawnableModal';
import { UserRoles, HasRole } from '../User/UserRoles';
import UserFeeList from '../Fee/UserFeeList';
import UnitList from '../Unit/UnitList';
import UnitMusicList from '../Unit/UnitMusicList';
import FileList from '../File/FileList';
import SpielList from '../Spiel/SpielList';
import FormObligationList from '../Form/FormObligationList';

class _FeeBox extends React.Component {
  render() {
    if (!this.props.contents.orgs.length) {
      return (<div></div>)
    }

    return (
      <div className="row">
        <div className="card col-xs-12">
          <div className="card-header card-danger">
            Outstanding Fees
          </div>
          <div className="card-block">
            <UserFeeList endpoint={ `/api/fees/forUser/${this.props.user._id}` }/>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <LaunchModalButton
                  className="btn btn-sm btn-block btn-outline-secondary"
                  buttonText="Generate Invoice"

                  title="Generate Invoice"
                  componentName="FEE_GENERATE_INVOICE"
                  modalProps={{
                    orgs: this.props.contents.orgs
                  }}
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <LaunchModalButton
                  className="btn btn-sm btn-block btn-outline-success"
                  buttonText="Pay Online"

                  title="Pay Fees"
                  componentName="FEE_USER_PAY"
                  modalProps={{
                    user: this.props.user
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class _UnitBox extends React.Component {
  musicBox(units) {
    units = units.filter(unit => {
      return (unit.unit_type.slug == 'guard');
    })

    if (units.length) {
      return (
        <div className="row">
          <div className="card offset col-xs-12">
            <div className="card-header card-info">
              Music Status
            </div>
            <div className="card-block">
              <UnitMusicList
                units={ units }
                user={ this.props.user }
              />
            </div>
          </div>

          <p></p>
        </div>
      )
    }

    return null
  }

  spielBox(units) {
    units = _.filter(units, unit => {
      return unit.spiel == null;
    })

    if (units.length) {
      return (
        <div className="row">
          <div className="card col-xs-12">
            <div className="card-header card-danger">
              Missing Spiels
            </div>
            <div className="card-block">
              <SpielList units={ units } />
            </div>
          </div>
        </div>
      )
    }

    return null;
  }

  render() {
    if (!this.props.contents.length) {
      return (<div></div>)
    }

    return (
      <div>
        <div className="row">
          <div className="card col-xs-12">
            <div className="card-header card-success">
              Your Registered Units
            </div>
            <div className="card-block">
              <UnitList
                endpoint={ `/api/units/forUser/${this.props.user._id}` }
                fedContents={ this.props.contents }
              />
            </div>
          </div>
        </div>

        { this.spielBox(this.props.contents) }
        { this.musicBox(this.props.contents) }
      </div>
    )
  }
}

class _FormSummary extends React.Component {
  render() {
    if (this.props.contents.length == 0) {
      return null;
    }

    return (
      <Link to="/forms/review">
        <div className="alert alert-warning">
          There { (this.props.contents.length == 1 ? 'is' : 'are') }
          <strong> { this.props.contents.length }</strong> form{ (this.props.contents.length == 1 ? '' : 's') } needing review.
        </div>
      </Link>
    )
  }
}

class _Home extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="page-header">CWEA Dashboard</h1>

        <HasRole role={ UserRoles.FormsManager }>
          <ContentsView
            subStore="formsmanager_summary"
            endpoint="/api/forms/review"
            component={ _FormSummary }
            user={ this.props.user }
            returnEmpty={ true }
          />
        </HasRole>

        <p></p>

        <div className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <Link to="/register" className="btn btn-block btn-outline-success">
              Register Your Unit(s)
            </Link>
          </div>
        </div>

        <p></p>

        <ContentsView
          subStore="dashboard_fees"
          endpoint={ `/api/fees/orgsForUser/${this.props.user._id}` }
          component={ _FeeBox }
          user={ this.props.user }
        />

        <ContentsView
          subStore="user_units"
          endpoint={ `/api/units/forUser/${this.props.user._id}` }
          component={ _UnitBox }
          user={ this.props.user }
          returnEmpty={ true }
        />

        <p></p>

        <div className="row">
          <div className="card col-xs-12">
            <div className="card-header card-warning">
              Required Forms for Your Units
            </div>
            <div className="card-block">
              <FormObligationList endpoint={ `/api/forms/forUser/${this.props.user._id}` } />
            </div>
          </div>
        </div>

        <p></p>

        <div className="row">
          <div className="card col-xs-12">
            <div className="card-header card-info">
              Uploaded Files
            </div>
            <div className="card-block">
              <FileList endpoint="/api/files" />
            </div>
            <HasRole role={ UserRoles.Administrator } className="card-footer">
              <div className="row">
                <LaunchModalButton
                  className="btn btn-sm btn-block btn-outline-info"
                  buttonText="Upload File"

                  title="Upload File"
                  componentName="FILE_UPLOAD"
                  modalProps={{
                    user: this.props.user,
                    refreshTable: 'fileList',
                    refreshEndpoint: '/api/files'
                  }}
                />
              </div>
            </HasRole>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToHomeProps = (state, ownProps) => {
  return {
    userToken: state.auth.token,
    user: state.auth.user
  }
}

const mapDispatchToHomeProps = (dispatch) => {
  return {

  }
}

export const Home = connect(mapStateToHomeProps, mapDispatchToHomeProps)(_Home);

export class About extends React.Component {
  render() {
    return (
      <div>
        <div class="h4">About Stuff</div>
      </div>
    );
  }
}

export class PageNotFound extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Whoops!</h1>

        <p>
          Looks like we dropped our toss. If you reached this page by clicking a link, you should let its
          provider know that there is an error in the URL.
        </p>

        <div className="row">
          <div className="offset-xs-1 col-xs-10">
            <Link role="button" to="/" className="btn btn-block btn-outline-info">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }
}

export class ConfirmPayment extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">You're all set!</h1>

        <p>
          PayPal has confirmed the payment of your selected fees. You should receive an email receipt
          shortly, if you haven't already.
        </p>

        <div className="row">
          <div className="offset-xs-1 col-xs-10">
            <Link role="button" to="/" className="btn btn-block btn-outline-info">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }
}

export class ErrorPayment extends React.Component {
  render() {
    return (
      <div>
        <h1 className="page-header">Yikes!</h1>

        <p>
          Your PayPal transaction was unsuccessful. Feel free to try again, as your account was not charged.
          If the issues persist, please contact us using the <strong>support</strong> link above.
        </p>

        <div className="row">
          <div className="offset-xs-1 col-xs-10">
            <Link role="button" to="/" className="btn btn-block btn-outline-info">Back to Dashboard</Link>
          </div>
        </div>
      </div>
    )
  }
}