import React from 'react';
import Select from 'react-select';
import { Decorator as FormsyDecorator } from 'formsy-react';
import MaskedInput from 'react-input-mask';

class FormError extends React.Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  render() {
    return (
      <div>
        <div key="errorMessage" className="form-validation-error">
          { this.props.children }
        </div>
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

  constructor() {
    super();

    this.state = {
      selectValue: 'SC'
    }
  }

  componentWillMount() {
    this.props.setValue(this.state.selectValue);
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
            onChange={ (selectValue) => this.props.setValue(selectValue) }
            value={ this.state.selectValue }
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