import React from 'react';
import fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import * as UserActions from './UserActions';
import FlexTable from '../../helpers/FlexTable';
import LoadingCube from '../../helpers/LoadingCube';

class _UserList extends React.Component {
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    body: React.PropTypes.object
  }

  static defaultProps = {
    isLoading: true
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  render() {
    if (this.props.isLoading === true) {
      return (
        <div className="container" style={{ 'height': '100%' }}>
          <LoadingCube show={ true } />
        </div>
      );
    }

    if (this.props.error) {
      return (
        <div className="container">
          <strong>There was an error: { this.props.error }.</strong>
        </div>
      );
    }

    const users = this.props.users;
    return (
      <div>
        <FlexTable
          emptyMessage="There are no registered users."
          columns={{
            'Name': user => { return user.formattedName },
            'Email': user => { return (<a href={`mailto:${user.email}`}>{ user.email }</a>)},
            'Phone': user => { return user.phone }
          }}
          contents={ users }
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    users: state.users.listUsers,
    error: state.users.listError,
    isLoading: state.users.listLoading
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => {
      dispatch(UserActions.fetchUserList(ownProps.endpoint, ownProps.body));
    }
  };
};

const UserList = connect(mapStateToProps, mapDispatchToProps)(_UserList);
export default UserList;