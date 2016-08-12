import React from 'react';

import { ReduxForm } from '../../forms/components';
import ComponentFlow from '../../helpers/componentFlow/ComponentFlow';
import RegistrationFlow from './RegistrationFlow';

export class Register extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <p className="display-3">Unit Registration</p>

        <ComponentFlow flow={ RegistrationFlow } />
      </div>
    )
  }
}