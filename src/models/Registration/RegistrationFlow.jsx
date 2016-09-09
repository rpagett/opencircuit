import React from 'react';
import { withRouter } from 'react-router';

import { ReduxForm, FormInput, ClassSelect, StateSelect, Radio } from '../../forms/components';
import ContentsView from '../../helpers/ContentsView/ContentsView';
import { setView } from '../../helpers/ComponentFlow/ComponentFlowActions';

const formProps = {
  subStore: 'unit_registration',
  submitEndpoint: '/api/units',
  submitMethod: 'POST'
}

const _UnitTypes = props => {
  let options = [];
  props.contents.map(type => {
    options.push(
      <Radio
        label={ type.name }
        key={ type._id }
        name="unit_type"
        value={ type._id }
      />
    );
  })

  return (
    <ReduxForm { ...formProps }>
      { options }
    </ReduxForm>
  )
}

const views = {
  'root': () => {
    return (
      <div>
        <p className="lead">
          Let's start with your team's parent organization.
        </p>

        <hr />

        <p>I represent:</p>
        <ReduxForm { ...formProps }>
          <Radio
            label="A middle or high school."
            name="scholastic"
            value="true"
          />
          <Radio
            label="A university or independent performance group."
            name="scholastic"
            value="false"
          />
        </ReduxForm>
      </div>
    )
  },

  'organization-details': () => {
    return (
      <div>
        <p className="lead">
          Now some details. These should be about your <strong>school or independent non-profit</strong>,
          not about the team itself.
        </p>

        <hr />

        <ReduxForm { ...formProps }>
          <FormInput name="organization.name" label="Organization Name" />
          <FormInput name="organization.street" label="Street" />
          <FormInput name="organization.city" label="City" />
          <StateSelect name="organization.state" label="State" />
          <FormInput name="organization.zip" label="ZIP" />
        </ReduxForm>
      </div>
    )
  },

  'unit-type': () => {
    return (
      <div>
        <p className="lead">
          Now it's time to focus on a team.
        </p>

        <hr />

        <p>
          This unit is:
        </p>

        <ContentsView subStore="register_unit_types" endpoint="/api/unittypes" component={ _UnitTypes } />
      </div>
    )
  },

  'unit-details': props => {
    const state = props.formState[formProps.subStore];

    return (
      <div>
        <p className="lead">
          Now it's time to focus on a team.
        </p>

        <hr />

        <ReduxForm { ...formProps }>
          <FormInput name="unit.name" label="Unit Name" />
          <ClassSelect name="unit.compclass" label="Class" unitType={ state.unit_type } />
          <FormInput name="unit.members" label="Members" />
        </ReduxForm>
      </div>
    )
  }
}

function fieldsEmpty(state, fields = [ ]) {
  for (let key in fields) {
    if (state[fields[key]] === null) {
      return true;
    }
  }

  return false;
}

const actions = {
  'root': (dispatch, getState) => {
    const state = getState().form[formProps.subStore];
    if (state.scholastic === null) {
      return;
    }

    dispatch(setView('organization-details'));
  },

  'organization-details': (dispatch, getState) => {
    const state = getState().form[formProps.subStore];
    if (fieldsEmpty(state, [
        'organization.name', 'organization.street', 'organization.city', 'organization.state',
        'organization.zip'
      ])) {
      return;
    }

    // TODO: add fuzzy search of existing organizations
    dispatch(setView('unit-type'));
  },

  'unit-type': (dispatch, getState) => {
    const state = getState().form[formProps.subStore];
    if (state.unit_type === null) {
      return;
    }

    dispatch(setView('unit-details'));
  },

  'unit-details': dispatch => {
    alert('Yep');
  }
}

const flow = {
  'root': {
    component: views['root'],
    buttonAction: actions['root']
  },
  'organization-details': {
    component: views['organization-details'],
    buttonAction: actions['organization-details'],
  },
  'unit-type': {
    component: views['unit-type'],
    buttonAction: actions['unit-type'],
  },
  'unit-details': {
    component: views['unit-details'],
    buttonAction: actions['unit-details']
  }
}

export default flow;