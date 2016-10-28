import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import {launch as launchModal} from '../../modals/ModalActions';
import { UserRoles, userHasRole } from './UserRoles';


export default class UserList extends React.Component {
  launchRolesOverlay(dispatch) {
    dispatch(launchModal(this.formattedName + '\'s Roles', 'USER_ROLES', {
      email: this.email
    }));
  }

  canEdit(modelUser, authUser) {
    if (authUser._id == modelUser._id || userHasRole(authUser, UserRoles.Administrator)) {
      return `${modelUser.profileUrl}/edit`
    }

    return null;
  }

  canDelete(modelUser, authUser) {
    if (authUser._id.toString() == '5768b81d855f632839aacd3b')
    {
      return `/api${modelUser.profileUrl}`
    }

    return null;
  }

  render() {
    return (
      <div>
        <FlexTable
          name="userList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no registered users."
          columns={{
            'Name': user => { return (<Link to={ user.profileUrl }>{ user.formattedName }</Link>) },
            'Email': user => { return (<a href={`mailto:${user.email}`}>{ user.email }</a>)},
            'Phone': user => { return user.phone },
            'Roles': (user, dispatch) => {
              return (
                <button
                  onClick={ this.launchRolesOverlay.bind(user, dispatch) }
                  className="btn btn-sm btn-info"
                  key={ user._id }
                >
                  Manage...
                </button>
              );
            }
          }}
          canEdit={ this.canEdit }
          canDelete={ this.canDelete }
          deriveName={ user => user.formattedName }
        />
      </div>
    );
  }
};