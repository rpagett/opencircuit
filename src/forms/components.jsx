import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Select from 'react-select';
import MaskedInput from 'react-input-mask';
import DateTimeField from 'react-datetime';
import Moment from 'moment';

import ContentsView from '../helpers/ContentsView/ContentsView';
import { fetchAPI } from '../helpers/functions';
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

  componentDidMount() {
    if (this.props.value) {
      let value = this.props.value;

      if (value instanceof Date) {
        console.log('It\'s a Date!')
        value = Moment(value);
      }
      else if (value instanceof Object) {
        value = value._id
      }

      this.props.updateField(value)
    }
  }

  updateValue(e) {
    // React-select does some funky stuff
    //const child = React.Children.only(this.props.children);

    if (e.currentTarget) {
      this.props.updateField(e.currentTarget.value);
    }
    else if (e._isAMomentObject) {
      this.props.updateField(e.toDate());
    }
    else {
      console.log('Nailed it!');
      //if (child.props.multiple) {
      //  this.props.updateField(selected.map(option => option.value));
      //}
      //else {
        this.props.updateField(e.value);
      //}
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
      else if (this.props.value instanceof Object) {
        console.log('Coercing object for ', this.props.name)
        childProps.valueKey = this.props.value._id
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

    if (this.props.inputClass) {
      inputClass += ' ' + this.props.inputClass;
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

export class ClassSelect extends React.Component {
  static propTypes = {
    unitType: React.PropTypes.string.isRequired,
    scholastic: React.PropTypes.bool.isRequired
  }

  fetchList() {
    let endpoint = `/api/unittypes/${this.props.unitType}/classes`;

    if (this.props.scholastic) {
      endpoint += '/scholastic';
    }
    return fetchAPI(endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return { options: json };
      });
  }

  render() {
    return (
      <InputWrapper { ...this.props } inputClass="select-group">
        <Select.Async
          className="form-control"
          clearable={ false }
          loadOptions={ this.fetchList.bind(this) }
          //filterOption={ function() { return true; } }
          autosize={ false }
        />
      </InputWrapper>
    );
  }
}

export class PaymentTypeSelect extends React.Component {
  fetchList() {
    let endpoint = `/api/fees/paymentTypes`;

    return fetchAPI(endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return { options: json };
      });
  }

  render() {
    return (
      <InputWrapper { ...this.props } inputClass="select-group">
        <Select.Async
          className="form-control"
          clearable={ false }
          loadOptions={ this.fetchList.bind(this) }
          autosize={ false }
          searchable={ false }
        />
      </InputWrapper>
    );
  }
}

export class UnitSelect extends React.Component {
  fetchList() {
    let endpoint = `/api/units/select`;

    return fetchAPI(endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return { options: json };
      });
  }

  render() {
    return (
      <InputWrapper { ...this.props } inputClass="select-group">
        <Select.Async
          className="form-control"
          clearable={ false }
          loadOptions={ this.fetchList.bind(this) }
          autosize={ false }
        />
      </InputWrapper>
    );
  }
}

export class FeeCategorySelect extends React.Component {
  fetchList() {
    let endpoint = `/api/feecategories/select`;

    return fetchAPI(endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        return { options: json };
      });
  }

  render() {
    return (
      <InputWrapper { ...this.props } inputClass="select-group">
        <Select.Async
          className="form-control"
          clearable={ false }
          loadOptions={ this.fetchList.bind(this) }
          autosize={ false }
          searchable={ false }
        />
      </InputWrapper>
    );
  }
}

export class UnitTypeSelect extends React.Component {
  fetchList() {
    return fetchAPI('/api/unittypes/select')
      .then(res => {
        return res.json();
      })
      .then(json => {
        return { options: json };
      });
  }

  render() {
    return (
      <InputWrapper { ...this.props } inputSelect="select-group">
        <Select.Async
          className="form-control"
          clearable={ false }
          loadOptions={ this.fetchList.bind(this) }
          filterOption={ () => { return true } }
          autosize={ false }
        />
      </InputWrapper>
    );
  }
}

export class UserSelect extends React.Component {
  fetchList() {
    return fetchAPI('/api/users/select')
      .then(res => {
        return res.json();
      })
      .then(json => {
        return { options: json };
      });
  }

  render() {
    return (
      <InputWrapper { ...this.props } inputClass="select-group">
        <Select.Async
          className="form-control"
          clearable={ false }
          loadOptions={ this.fetchList.bind(this) }
          autosize={ false }
        />
      </InputWrapper>
    );
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
      <InputWrapper { ...this.props } inputClass="select-group">
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
          strictParsing={ false }
          inputProps={{
            className: 'form-control',
            //...this.props
          }}
          value={ this.props.value }
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

  componentDidMount() {
    if (this.props.inForm && this.props.preChecked != null) {
      this.props.updateField(this.props.preChecked);
    }
    else {
      this.props.updateCheckbox(this.props.preChecked);
    }
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
              className="form-control"
              name={ this.props.name }
              checked={ this.props.formChecked || this.props.preChecked }
              onChange={ this.updateChecked.bind(this) }
            />
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="checkbox form-check">
          <label>
            <input
              type="checkbox"
              className="form-check-input"
              name={ this.props.name }
              value={ this.props.value }
              checked={ this.props.checked }
              onChange={ this.updateChecked.bind(this) }
            />
            <span className="checkbox-label form-check-label">{ this.props.label }</span>
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

const mapDispatchToCheckboxProps = (dispatch, props) => {
  return {
    updateCheckbox: checked => {
      dispatch(FormActions.updateCheckbox(props.formStore, props.name, props.value, checked))
    },
    updateField: checked => {
      dispatch(FormActions.updateField(props.formStore, props.name, checked))
    }
  }
}

export const Checkbox = connect(mapStateToCheckboxProps, mapDispatchToCheckboxProps)(_Checkbox);

class _Radio extends React.Component {
  static propTypes = {
    label: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }

  updateChecked(e) {
    this.props.updateField(e.target.checked);
  }

  render() {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
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

const mapStateToRadioProps = (state, props) => {
  return {
    formChecked: state.form[props.formStore][props.name] === props.value
  }
}

const mapDispatchToRadioProps = (dispatch, props) => {
  return {
    updateField: checked => {
      dispatch(FormActions.updateField(props.formStore, props.name, props.value))
    }
  }
}

export const Radio = connect(mapStateToCheckboxProps, mapDispatchToRadioProps)(_Radio);

class _EventChecks extends React.Component {
  static propTypes = {
    endpoint: React.PropTypes.string.isRequired
  }

  constructor() {
    super();

    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    fetchAPI(this.props.endpoint)
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({
          isLoading: false,
          events: json.events
        })
      });
  }

  render() {
    let boxes = [ ];

    if (this.state.isLoading) {
      return (
        <div>
          <LoadingCube show={ true }/>
        </div>
      );
    }

    console.log(this.state.events);

    if (!this.state.events) {
      return (
        <p>
          No events available at this time.
        </p>
      )
    }

    this.state.events.map(event => {
      boxes.push(
        <div className="col-xs-12" key={ `col-${event.id}` }>
          <Checkbox
            name="events"
            formStore={ this.props.formStore }
            key={ event._id }
            label={ event.name + ' (' + event.formattedDate + ')' }
            value={ event._id }
            preChecked={ event.attending }
          />
        </div>
      )
    })

    return (
      <div className="row">
        { boxes }
      </div>
    )
  }
}

export class EventChecks extends React.Component {
  render() {
    return (
      <_EventChecks
        unitType={ this.props.unitType }
        endpoint={ this.props.endpoint }
        formStore={ this.props.formStore }
        subStore="event_checks"
        component={ _EventChecks }
      />
    )
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

      let childProps = {formStore: this.props.subStore, formModel: this.props.formModel};
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

          if (res.redirect) {
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
    globalError: state.form.globalErrors[props.subStore],
    formModel: state.form[props.subStore]
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