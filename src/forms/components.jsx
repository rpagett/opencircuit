import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';
import MaskedInput from 'react-input-mask';
import DateTimeField from 'react-datetime';
import Moment from 'moment';

import * as FormActions from './FormActions';
import * as ModalActions from '../modals/ModalActions';
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

class _InputWrapper extends React.Component {
  static propTypes = {
    afterInput: React.PropTypes.string,
    beforeInput: React.PropTypes.string,
    error: React.PropTypes.string,
    formStore: React.PropTypes.string.isRequired,
    horizontal: React.PropTypes.bool,
    label: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string
  }

  static defaultProps = {
    horizontal: true,
    type: 'text',
    value: ''
  }

  updateValue(e, selected) {
    // React-select does some funky stuff
    const child = React.Children.only(this.props.children);

    if (e.currentTarget) {
      this.props.updateField(e.currentTarget.value);
    }
    else if (e._isAMomentObject) {
      this.props.updateField(e.toDate());
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
        name: this.props.name,
        value: this.props.value,
        type: this.props.type
      };

      if (this.props.value instanceof Date) {
        console.log('It\'s a Date!')
        childProps.value = Moment(this.props.value);
      }

      childProps.children = this.recursivelyCloneChildren(child.props.children);

      return React.cloneElement(child, childProps);
    })
  }

  render() {
    let className='form-group row';

    if (this.props.error) {
      className += ' has-danger';
    }

    let labelClass = 'form-control-label col-xs-12';
    let inputClass = 'col-xs-12';
    if (this.props.label && this.props.horizontal) {
      inputClass += ' col-sm-8';
      labelClass += ' col-sm-4';
    }

    return (
      <div className={ className }>
        { (this.props.label ?
          <label htmlFor={ this.props.name } className={ labelClass }>
            { this.props.label }
          </label> : '') }

        <div className={ inputClass }>
          <div className="input-group">
            {( this.props.beforeInput ? <span className="input-group-addon">{ this.props.beforeInput }</span> : null )}

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

const InputWrapper = connect(mapStateToFormInputProps, mapDispatchToFormInputProps)(_InputWrapper);

export class FormInput extends React.Component {
  render() {
    return (
      <InputWrapper { ...this.props }>
        <input className="form-control" />
      </InputWrapper>
    );
  }
}

export class PhoneInput extends React.Component {
  render() {
    return (
      <InputWrapper { ...this.props }>
        <MaskedInput type="tel" className="form-control" mask="(999) 999 - 9999" />
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
    return (
      <InputWrapper { ...this.props }>
        <_FormStatic />
      </InputWrapper>
    );
  }
};

export class TextArea extends React.Component {
  render() {
    return (
      <InputWrapper horizontal={ false } { ...this.props }>
        <textarea className="form-control" />
      </InputWrapper>
    )
  }
}

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

  render() {
    return (
      <InputWrapper { ...this.props }>
        <Select
          className="form-control"
          clearable={ false }
          options={ this.selectOptions() }
          autosize={ false }
        />
      </InputWrapper>
    );
  }
}

export class DateTime extends React.Component {
  render() {
    return (
      <InputWrapper { ...this.props }>
        <DateTimeField
          strict={ false }
          inputProps={{
          className: 'form-control',
           ...this.props
        }}
        />
      </InputWrapper>
    );
  }
}

class _Checkbox extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }

  updateChecked(e) {
    if (this.props.inForm) {
      this.props.updateField(e.target.checked);
    }
    else {
      this.props.updateCheckbox(e.target.checked);
    }
  }

  render() {
    if (this.props.inForm) {
      return (
        <div className="form-group row">
          <div className="col-xs-10 col-sm-4 form-control-label">
            { this.props.label }
          </div>
          <div className="col-xs-2 col-sm-8">
            <input
              type="checkbox"
              name={ this.props.name }
              checked={ this.props.formChecked }
              onChange={ this.updateChecked.bind(this) }
            />
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              name={ this.props.name }
              value={ this.props.value }
              checked={ this.props.checked }
              onChange={ this.updateChecked.bind(this) }
            />
            <span className="checkbox-label">{ this.props.label }</span>
          </label>
        </div>
      )
    }
  }
}

const mapStateToCheckboxProps = (state, props) => {
  return {
    checked: state.form[props.formStore][props.name] &&
      state.form[props.formStore][props.name][props.value],
    formChecked: state.form[props.formStore][props.name]
  }
}

const mapStateToDispatchProps = (dispatch, props) => {
  return {
    updateCheckbox: checked => {
      dispatch(FormActions.updateCheckbox(props.formStore, props.name, props.value, checked))
    },
    updateField: checked => {
      dispatch(FormActions.updateField(props.formStore, props.name, checked))
    }
  }
}

export const Checkbox = connect(mapStateToCheckboxProps, mapStateToDispatchProps)(_Checkbox);

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
        if (res && res.success === true) {

          if (this.props.inModal) {
            this.props.closeModal();
          }
          else if (res.redirect) {
            if (res.external && window) {
              window.location = res.redirect;
            }
            else {
              this.props.router.push(res.redirect)
            }
          }
        }
      })
  }

  render() {
    if (this.props.globalError) {
      return (
        <div>
          <strong>{ this.props.globalError }</strong>
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
    },
    closeModal: () => { dispatch(ModalActions.close()) }
  }
}

export const ReduxForm = withRouter(connect(mapStateToReduxFormProps, mapDispatchToReduxFormProps)(_ReduxForm));