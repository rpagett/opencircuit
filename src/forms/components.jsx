import React from 'react';
import { Decorator as FormsyDecorator } from 'formsy-react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export class FormError extends React.Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="validationerror"
          transitionEnterTimeout={ 500 }
          transitionLeaveTimeout={ 300 }
          transitionAppear={ true }
          transitionAppearTimeout={ 30 }
        >
          <div key="errorMessage" className="form-validation-error">
            { this.props.children }
          </div>
        </ReactCSSTransitionGroup>
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
    const className = 'form-group row ' +
      (this.props.showError() ? 'has-danger' : '');
    const errorMessage = this.props.getErrorMessage();

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
          <input
            type={ this.props.inputType }
            name={ this.props.name }
            className="form-control"
            defaultValue={ this.props.getValue() }
            { ...validation }
            { ...this.props }
          />
          <FormError>
            { errorMessage }
          </FormError>
        </div>
      </div>
    );
  }
};

export class ValidatedForm extends React.Component {
  render() {
    return (
      <form { ...this.props }>
        { this.props.children }
      </form>
    );
  }
}
