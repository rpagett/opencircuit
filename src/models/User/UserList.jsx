import React from 'react';
import { Link } from 'react-router';

import FlexTable from '../../flexTable/FlexTable';

class UserList extends React.Component {
    return (
      <div>
        <FlexTable
          endpoint="/api/users"
          emptyMessage="There are no registered users."
          columns={{
            'Name': user => { return (<Link to={ user.profileURL }>{ user.formattedName }</Link>) },
            'Email': user => { return (<a href={`mailto:${user.email}`}>{ user.email }</a>)},
            'Phone': user => { return user.phone }
          }}
        />
      </div>
    );
  }
};