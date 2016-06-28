import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';
import { Decorator as FormsyDecorator } from 'formsy-react';
import MaskedInput from 'react-input-mask';

import * as FormActions from './FormActions';
import LoadingCube from '../helpers/LoadingCube';

class FormError extends React.Component {
  render() {
    return (
      <div className="text-danger form-validation-error">
        { this.props.children }
      </div>
    );
  }
}

@FormsyDecorator()
export class FormInput extends React.Component {
  constructor() {
    super();

    this.state = {
      hasError: false
    };
  }

  componentDidMount() {
    this.setState({
      hasError: false
    });
  }

  changeValue(e) {
    this.props.setValue(e.currentTarget.value);
  }

  render() {
    const isRequiredError = this.props.isRequired() && !this.props.isValid() && this.props.requiredError;
    const className = 'form-group row ' +
      (this.props.showError() || isRequiredError ? 'has-danger' : '');
    const errorMessage = this.props.getErrorMessage() || isRequiredError;

    let validation = { };
    if (this.props.validationHook == 'change') {
      validation['onChange'] = this.changeValue.bind(this);
    }
    else {
      validation['onBlur'] = this.changeValue.bind(this);
    }

    return (
      <div className={ className }>
        <label htmlFor={ this.props.name } className="col-xs-12 col-sm-4 form-control-label">
          { this.props.label }
        </label>

        <div className="col-xs-12 col-sm-8">
          <div className="input-group">
            <input
              type={ this.props.inputType || 'text' }
              name={ this.props.name }
              className="form-control"
              defaultValue={ this.props.getValue() }
              { ...validation }
              { ...this.props }
            />

            {( this.props.afterInput ? <span className="input-group-addon">{ this.props.afterInput }</span> : null )}
          </div>

          <FormError>
            { errorMessage }
          </FormError>
        </div>
      </div>
    );
  }
};

class _InputWrapper extends React.Component {
  static propTypes = {
    afterInput: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string,
    error: React.PropTypes.string,
    formStore: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    type: 'text',
    value: ''
  }

  updateValue(e, selected) {
    // React-select does some funky stuff
    const child = React.Children.only(this.props.children);

    if (e.currentTarget) {
      this.props.updateField(e.currentTarget.value);
    }
    else {
      console.log('Nailed it!');
      if (child.props.multiple) {
        this.props.updateField(selected.map(option => option.value));
      }
      else {
        this.props.updateField(e.value);
      }
    }
  }

  recursivelyCloneChildren(children) {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }

      let childProps = {
        onChange: this.updateValue.bind(this),
        className: 'form-control',
        name: this.props.name,
        value: this.props.value
      };
      childProps.children = this.recursivelyCloneChildren(child.props.children);

      return React.cloneElement(child, childProps);
    })
  }

  render() {
    let className='form-group row';

    if (this.props.error) {
      className += ' has-danger';
    }

    return (
      <div className={ className }>
        <label htmlFor={ this.props.name } className="col-xs-12 col-sm-4 form-control-label">
          { this.props.label }
        </label>

        <div className="col-xs-12 col-sm-8">
          <div className="input-group">
            { this.recursivelyCloneChildren(this.props.children) }

            {( this.props.afterInput ? <span className="input-group-addon">{ this.props.afterInput }</span> : null )}
          </div>

          <FormError>
            { this.props.error }
          </FormError>
        </div>
      </div>
    );
  }
};

const mapStateToFormInputProps = (state, props) => {
  return {
    value: state.form[props.formStore][props.name],
    error: state.form[props.formStore + '_errors'][props.name]
  }
}

const mapDispatchToFormInputProps = (dispatch, props) => {
  return {
    updateField: value => {
      dispatch(FormActions.updateField(props.formStore, props.name, value))
    }
  }
}

export const InputWrapper = connect(mapStateToFormInputProps, mapDispatchToFormInputProps)(_InputWrapper);

export class LiberatedFormInput extends React.Component {
  render() {
    return (
      <InputWrapper { ...this.props }>
        <input className="form-control" />
      </InputWrapper>
    );
  }
}

export class LiberatedPhoneInput extends React.Component {
  render() {
    return (
      <InputWrapper { ...this.props }>
        <MaskedInput className="form-control" mask="(999) 999 - 9999" />
      </InputWrapper>
    )
  }
}

class _FormStatic extends React.Component {
  render() {
    return (
      <p className="form-control-static">
        { this.props.value }
      </p>
    )
  }
}

export class FormStatic extends React.Component {
  render() {
    const className='form-group row';

    return (
      <InputWrapper { ...this.props }>
        <_FormStatic />
      </InputWrapper>
    );
  }
};

export class LiberatedStateSelect extends React.Component {
  selectOptions() {
    return [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'DC', label: 'District Of Columbia' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ];
  }

  render() {
    return (
      <InputWrapper { ...this.props }>
        <Select
          clearable={ false }
          options={ this.selectOptions() }
          autosize={ false }
        />
      </InputWrapper>
    );
  }
}

@FormsyDecorator()
export class StateSelect extends React.Component {
  selectOptions() {
    return [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'DC', label: 'District Of Columbia' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ];
  }

  changeValue(value, selectedOptions) {
    if (this.props.multiple) {
      this.props.setValue(selectedOptions.map(option => option.value));
    }
    else {
      this.props.setValue(value.value);
    }
  }

  render() {
    const isRequiredError = this.props.isRequired() && !this.props.isValid() && this.props.requiredError;
    const className = 'form-group row ' +
      (this.props.showError() || isRequiredError ? 'has-danger' : '');
    const errorMessage = this.props.getErrorMessage() || isRequiredError;

    return (
      <div className={ className }>
        <label htmlFor={ this.props.name } className="col-xs-12 col-sm-4 form-control-label">
          { this.props.label }
        </label>

        <div className="col-xs-12 col-sm-8">
          <Select
            name={ this.props.name }
            className="form-control"
            clearable={ false }
            options={ this.selectOptions() }
            onChange={ this.changeValue.bind(this) }
            value={ this.props.getValue() }
            autosize={ false }
            { ...this.props }
          />
        </div>
      </div>
    );
  }
}

@FormsyDecorator()
export class PhoneInput extends React.Component {
  changeValue(e) {
    this.props.setValue(e.currentTarget.value);
  }

  render() {
    const isRequiredError = this.props.isRequired() && !this.props.isValid() && this.props.requiredError;
    const className = 'form-group row ' +
      (this.props.showError() || isRequiredError ? 'has-danger' : '');
    const errorMessage = this.props.getErrorMessage() || isRequiredError;

    return (
      <div className={ className }>
        <label htmlFor={ this.props.name } className="col-xs-12 col-sm-4 form-control-label">
          { this.props.label }
        </label>

        <div className="col-xs-12 col-sm-8">
          <div className="input-group">
            {( this.props.beforeInput ? <span className="input-group-addon">{ this.props.beforeInput }</span> : null )}

            <MaskedInput
              name={ this.props.name }
              className="form-control"
              onChange={ this.changeValue.bind(this) }
              defaultValue={ this.props.getValue() }
              mask="(999) 999 - 9999"
              { ...this.props }
            />

            {( this.props.afterInput ? <span className="input-group-addon">{ this.props.afterInput }</span> : null )}
          </div>

          <FormError>
            { errorMessage }
          </FormError>
        </div>
      </div>
    );
  }
}

class _ReduxForm extends React.Component {
  static propTypes = {
    submitEndpoint: React.PropTypes.string.isRequired,
    submitMethod: React.PropTypes.string.isRequired,
    fetchEndpoint: React.PropTypes.string,
    isLoading: React.PropTypes.bool,
    subStore: React.PropTypes.string.isRequired
  }

  static defaultProps = {
    isLoading: true
  }

  componentDidMount() {
    this.props.fetchData();
  }

  recursivelyCloneChildren(children) {
    return React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      }

      let childProps = {formStore: this.props.subStore};
      childProps.children = this.recursivelyCloneChildren(child.props.children);

      return React.cloneElement(child, childProps);
    })
  }

  handleSubmit(event) {
    event && event.preventDefault();

    this.props.submitData()
      .then(res => {
        if (res.success === true) {
          this.props.router.push(res.redirect)
        }
      })
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

    return (
      <form {...this.props} onSubmit={ this.handleSubmit.bind(this) } action="">
        { this.recursivelyCloneChildren(this.props.children) }
      </form>
    )
  }
}

const mapStateToReduxFormProps = (state, props) => {
  return {
    isLoading: state.form.loading[props.subStore],
    globalError: state.form.globalErrors[props.subStore]
  }
}

const mapDispatchToReduxFormProps = (dispatch, props) => {
  return {
    fetchData: () => { dispatch(FormActions.fetchData(props.subStore, props.fetchEndpoint)) },
    submitData: () => {
      return dispatch(FormActions.submitData(props.subStore, props.submitMethod, props.submitEndpoint))
    }
  }
}

export const ReduxForm = withRouter(connect(mapStateToReduxFormProps, mapDispatchToReduxFormProps)(_ReduxForm));