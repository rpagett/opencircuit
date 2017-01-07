import React from 'react';
import { Link } from 'react-router';

import { LaunchModalButton } from '../../modals/SpawnableModal';
import { userHasRole, UserRoles } from '../User/UserRoles';
import FlexTable from '../../helpers/FlexTable/FlexTable'

export default class UnitEventsList extends React.Component {
  render() {
    return (
      <div>
        <FlexTable
          name="unitEventsList"
          endpoint={ this.props.endpoint }
          emptyMessage="This unit is currently not registered for any events."
          columns={{
            'Name': reg => { return (<Link key={ reg.found._id + '-name' } to={ reg.detailsUrl }>
              { reg.name }</Link>) },
            'Date': reg => { return reg.formattedDate },
            'Class': reg => { return reg.competition_class },
            'Status': reg => { return reg.status },
            'Critique': reg => {
              if (reg.critique_closed) {
                if (reg.found.attending_critique) {
                  return (<i key={ reg.found._id + '-critique' }>Attending Critique</i>)
                }

                return (<i key={ reg.found._id + '-critique' }>Registration Closed</i>);
              }

              if (reg.found.attending_critique) {
                return (
                  <LaunchModalButton
                    className="btn btn-block btn-sm btn-success"
                    buttonText="Registered"
                    key={ reg.found._id + '-critique' }

                    title="Remove Critique Registration?"
                    componentName="UNIT_CRITIQUE_REMOVE"
                    modalProps={{
                      event: reg,
                      reg: reg.found,
                      refreshTable: 'unitEventsList',
                      refreshEndpoint: this.props.endpoint
                    }}
                  />
                )
              }

              return (
                <LaunchModalButton
                  className="btn btn-block btn-sm btn-warning"
                  buttonText="Register?"
                  key={ reg.found._id + '-critique' }

                  title="Register for Critique?"
                  componentName="UNIT_CRITIQUE_REGISTER"
                  modalProps={{
                    event: reg,
                    reg: reg.found,
                    refreshTable: 'unitEventsList',
                    refreshEndpoint: this.props.endpoint

                  }}
                />
              )
            }
          }}
        />
      </div>
    );
  }
};