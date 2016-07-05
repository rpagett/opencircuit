import React from 'react';
import { connect } from 'react-redux';

import { UserRoles, HasRole } from '../User/UserRoles';

class _Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="alert alert-success">
          { (this.props.userToken ? 'You\'re logged in!' : 'Everything is wonderful!') }

          <span className="pull-right">
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