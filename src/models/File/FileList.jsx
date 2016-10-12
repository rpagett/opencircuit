import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router';

import FlexTable from '../../helpers/FlexTable/FlexTable'
import { UserRoles, userHasRole } from '../User/UserRoles';

export default class FileList extends React.Component {
  canDelete(file, authUser) {
    if (userHasRole(authUser, UserRoles.Administrator)) {
      return `/api/files/${file.system_filename}`
    }

    return null;
  }

  render() {
    return (
      <div>
        <FlexTable
          name="fileList"
          endpoint={ this.props.endpoint }
          emptyMessage="There are no public files."
          columns={{
            'File': file => { return <a href={ file.userUrl } target="_blank">{ file.user_filename }</a> },
            'Uploaded': file => file.formattedCreationDate,
            'By': file => file.uploader.formattedName
          }}
          deriveName={ file => file.user_filename }
          canDelete={ this.canDelete }
        />
      </div>
    );
  }
};