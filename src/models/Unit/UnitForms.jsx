import React from 'react';

import ModelView from '../../helpers/ModelView/ModelView';
import { ReduxForm, FormInput, FormStatic, UserSelect, EventChecks, Checkbox, ClassSelect, TextArea } from '../../forms/components';
import { UserRoles, HasRole } from '../User/UserRoles';

class _ClassBox extends React.Component {
  render() {
    console.log('FORMSTORE', this.props.formModel);
    return (
      <ClassSelect
        name="competition_class"
        label="Class"
        formStore="unit_edit"
        unitType={ this.props.formModel.unit_type._id }
        scholastic={ this.props.formModel.organization.is_school }
        //value={ this.props.formModel.competition_class._id }
      />
    )
  }
}

export class Edit extends React.Component {
  render() {
    let fetch = { };

    if (this.props.creationForm) {
      fetch.submitEndpoint = `/api/units`;
      fetch.submitMethod = 'POST';
    }
    else {
      fetch.submitEndpoint = `/api/units/${this.props.slug}`;
      fetch.fetchEndpoint = `/api/units/${this.props.slug}`;
      fetch.submitMethod = 'PATCH';
    }

    return (
      <ReduxForm
        subStore="unit_edit"
        { ...fetch }
      >
        <FormStatic name="name" label="Name" />

        <HasRole role={ UserRoles.Administrator }>
          <FormInput name="name" label="Name" />
        </HasRole>

        <FormInput type="number" name="members" label="Member Count" />

        <HasRole role={ UserRoles.Administrator }>
          { /*<UserSelect name="director" label="Director" /> */ }
          <Checkbox inForm={ true } name="registered" label="Registered" />
        </HasRole>

        <HasRole role={ UserRoles.EventDirector }>
          <TextArea name="notes" label="Administrative Notes" />
        </HasRole>

        <EventChecks endpoint={ `/api/units/${this.props.slug}/eventChecks` } />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          {( this.props.creationForm ? 'Create Unit' : 'Save Changes' )}
        </button>
      </ReduxForm>
    )
  }
}