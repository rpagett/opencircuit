import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { LiberatedFormInput as FormInput, FormStatic } from '../../forms/components';
import LoadingCube from '../../helpers/LoadingCube';
import * as UserActions from './UserActions';

class _Edit extends React.Component {
  static defaultProps = {
    isLoading: true
  }

  editSubmit(values) {
    console.log('VALUES ARE ', values);

    this.props.submitEditData(values)
      .then(data => {
        // do stuff
      })
      .catch(errors => {
        throw new SubmissionError(errors);
      });
  }

  componentDidMount() {
    this.props.fetchUserData(this.props.email);
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <LoadingCube show={ true }/>
        </div>
      );
    }

    console.log(this.props.initialValues);

    return (
      <form onSubmit={ this.props.handleSubmit(this.editSubmit.bind(this)) }>
        <FormStatic name="email" label="Email" fill={ this.props.initialValues.email } />
        <Field component={ FormInput } name="first_name" label="First Name" />
        <Field component={ FormInput } name="mi" label="Middle Initial" />
        <Field component={ FormInput } name="last_name" label="Last Name" />
        <Field component={ FormInput } name="street" label="Street" />
        <Field component={ FormInput } name="address_2" label="Address 2" />
        <Field component={ FormInput } name="city" label="City" />
        <Field component={ FormInput } name="zip" label="ZIP" />

        <div className="row">
          <div className="pull-center">
            <button type="submit" className="pull-center btn btn-success" disabled={ this.props.submitting }>
              Save Changes
            </button>
          </div>
        </div>
      </form>
    )
  }
}

const mapStateToEditProps = (state) => {
  return {
    initialValues: state.users.editFormData,
    isLoading: state.users.editFormLoading
  }
}

const mapDispatchToEditProps = (dispatch) => {
  return {
    fetchUserData: (email) => {
      dispatch(UserActions.fetchEditData(email));
    },
    submitEditData: (values) => {
      return dispatch(UserActions.submitEditData(values))
    }
  }
}

const rf_Edit = reduxForm({
  form: 'userEditForm'
})(_Edit);

export const Edit = connect(mapStateToEditProps, mapDispatchToEditProps)(rf_Edit);