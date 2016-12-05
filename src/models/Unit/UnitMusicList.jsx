import React from 'react';
import { Link } from 'react-router';
import Moment from 'moment';

import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable';
import {launch as launchModal} from '../../modals/ModalActions';
import { LaunchModalButton } from '../../modals/SpawnableModal';

export default class UnitList extends React.Component {
  canEdit(unit, user) {
    return null;
  }

  canDelete(unit, user) {
    return null
  }

  render() {
    return (
      <div>
        <FlexTable
          name="unitMusicList"
          emptyMessage="There are no registered units."
          fedContents={ this.props.units }
          columns={{
            'Name': unit => { return (<Link to={ unit.detailsUrl }>{ unit.name }</Link>) },
            'Status': unit => {
              if (unit.last_music_submission) {
                return 'Submitted ' + Moment(unit.last_music_submission).format('MMM. Do, YYYY [at] h:mm a')
              }
              else {
                return 'None submitted';
              }
            },
            'Submit': unit => {
              return (<LaunchModalButton
                className="btn btn-sm btn-block btn-outline-info"
                buttonText="Submit Music"
                key={ 'mus-' + unit.slug }

                title="Submit Music"
                componentName="UNIT_SUBMIT_MUSIC"
                modalProps={{
                  unit,
                  user: this.props.user,
                  refreshTable: 'unitMusicList',
                  refreshEndpoint: `/api/units/forUser/${this.props.user._id}`
                }}
              />)
            },
          }}
          canEdit={ null }
          canDelete={ null }
          deriveName={ unit => unit.name }
        />
      </div>
    );
  }
};