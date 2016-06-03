import React from 'react';

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

  render() {
    const className = 'form-group row ' +
      (this.state.hasError ? 'has-danger' : '');

    return (
      <div className={ className }>
        <label htmlFor={ this.props.name } className="col-sm-4 form-control-label">
          { this.props.label }
        </label>

        <div className="col-sm-8">
          <input
            type={ this.props.inputType }
            name={ this.props.name }
            className="form-control"
            { ...this.props }
          />
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