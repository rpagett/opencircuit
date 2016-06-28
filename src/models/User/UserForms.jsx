import React from 'react';
import { connect } from 'react-redux';

import { ReduxForm,
  LiberatedFormInput as FormInput,
  LiberatedPhoneInput as PhoneInput,
  LiberatedStateSelect as StateSelect,
  FormStatic } from '../../forms/components';
import LoadingCube from '../../helpers/LoadingCube';
import * as UserActions from './UserActions';

class _Edit extends React.Component {
  render() {
    console.log('Getting ready to return.');
    return (
      <ReduxForm
        subStore="user_edit"
        fetchEndpoint={ `/api/users/${this.props.email}` }
        submitEndpoint={ `/api/users/${this.props.email}` }
        submitMethod="PATCH"
      >
        <FormStatic name="email" label="Email" />
        <FormInput name="first_name" label="First Name"/>
        <FormInput name="mi" label="Middle Initial" />
        <FormInput name="last_name" label="Last Name" />
        <PhoneInput name="phone" label="Phone" />
        <FormInput name="street" label="Street" />
        <FormInput name="address_2" label="Address 2" />
        <FormInput name="city" label="City" />
        <StateSelect name="state" label="State" />
        <FormInput name="zip" label="ZIP" />

        <button name="submit" type="submit" className="btn btn-success btn-block">
          Save Changes
        </button>
      </ReduxForm>
    )
  }
}

const mapStateToEditProps = (state) => {
  return {
    //values: state.users.editFormData,
    isLoading: state.users.editFormLoading,
    globalError: state.users.editFormError,
    //errors: state.users.editFormErrors
  }
}

const mapDispatchToEditProps = (dispatch) => {
  return {
    fetchUserData: (email) => {
      dispatch(UserActions.fetchEditData(email))
    },
    submitEditData: (formData) => {
      dispatch(UserActions.submitEditData(formData))
    }
  }
}

export const Edit = connect(mapStateToEditProps, mapDispatchToEditProps)(_Edit);