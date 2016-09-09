import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import ContentsView from '../../helpers/contentsView/ContentsView';
import { LaunchModalButton } from '../../modals/SpawnableModal';
import { UserRoles, HasRole } from '../User/UserRoles';
import UserFeeList from '../Fee/UserFeeList';

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
            <UserFeeList endpoint={ `/api/fees/forUser/${this.props.user._id}` } />
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

class _Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="alert alert-success">
          { (this.props.userToken ? 'You\'re logged in!' : 'Everything is wonderful!') }

          <span className="pull-xs-right">
            <strong>
              { (this.props.user ? this.props.user.email : 'Seriously!') }
           </strong>
          </span>
        </div>

        <HasRole role={ UserRoles.Administrator }>
          <div className="alert alert-warning">
            You have the right privileges.
          </div>
        </HasRole>

        <ContentsView
          subStore="dashboard_fees"
          endpoint={ `/api/fees/orgsForUser/${this.props.user._id}` }
          component={ _FeeBox }
          user={ this.props.user }
          returnEmpty={ true }
        />

        <div className="row">
          <div className="col-xs-12 offset-sm-1 col-sm-10">
            <Link to="/register" className="btn btn-block btn-outline-success">
              Register
            </Link>
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