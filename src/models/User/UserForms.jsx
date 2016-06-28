import React from 'react';
import { connect } from 'react-redux';

import { ReduxForm, LiberatedFormInput as FormInput, FormStatic } from '../../forms/components';
import LoadingCube from '../../helpers/LoadingCube';
import * as UserActions from './UserActions';

class _Edit extends React.Component {
  static defaultProps = {
    isLoading: true
  }

  submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    this.props.submitEditData(formData);
  }

  // TODO tomorrow: Create a form container component to manage state and take care of everything so that
  //    EditForm can be completely dumb. Should affect LiberatedFormInput and FormStatic and override onSubmit.
  //    Validation happens server-side, so it only needs an endpoint, identifier, and formStore [subStore?]

  componentDidMount() {
    this.props.fetchUserData(this.props.email);
  }

  render() {
    if (this.props.globalError) {
      return (
        <div>
          <strong>Error: { this.props.globalError }</strong>
        </div>
      );
    }
    else if (this.props.isLoading) {
      return (
        <div>
          <LoadingCube show={ true }/>
        </div>
      );
    }


    //const values = this.props.values;
    //const errors = this.props.errors;
    //console.log(values);

    console.log('Getting ready to return.');
    return (
      <ReduxForm
        subStore="user_edit"
        //onSubmit={ this.submit.bind(this) }
      >
        <FormStatic name="email" label="Email" />
        <FormInput name="first_name" label="First Name"/>
        <FormInput name="mi" label="Middle Initial" />
        <FormInput name="last_name" label="Last Name" />
        <FormInput name="street" label="Street" />
        <FormInput name="address_2" label="Address 2" />
        <FormInput name="city" label="City" />
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