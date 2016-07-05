import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../flexTable/FlexTable'
import {launch as launchModal} from '../../modals/ModalActions';

export default class UserList extends React.Component {
  launchRolesOverlay(dispatch) {
    dispatch(launchModal(this.formattedName + '\'s Roles', 'USER_ROLES', {
      email: this.email
    }));
  }

  render() {
    return (
      <div>
        <FlexTable
          endpoint="/api/users"
          emptyMessage="There are no registered users."
          columns={{
            'Name': user => { return (<Link to={ user.profileURL }>{ user.formattedName }</Link>) },
            'Email': user => { return (<a href={`mailto:${user.email}`}>{ user.email }</a>)},
            'Phone': user => { return user.phone },
            'Roles': (user, dispatch) => {
              return (
                <button onClick={ this.launchRolesOverlay.bind(user, dispatch) } className="btn btn-sm btn-info">
                  Manage...
                </button>
              );
            }
          }}
        />
      </div>
    );
  }
};