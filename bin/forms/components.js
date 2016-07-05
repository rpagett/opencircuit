'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxForm = exports.Checkbox = exports.StateSelect = exports.FormStatic = exports.PhoneInput = exports.FormInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp2, _class3, _temp3;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

var _FormActions = require('./FormActions');

var FormActions = _interopRequireWildcard(_FormActions);

var _ModalActions = require('../modals/ModalActions');

var ModalActions = _interopRequireWildcard(_ModalActions);

var _LoadingCube = require('../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormError = function (_React$Component) {
  _inherits(FormError, _React$Component);

  function FormError() {
    _classCallCheck(this, FormError);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormError).apply(this, arguments));
  }

  _createClass(FormError, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'text-danger form-validation-error' },
        this.props.children
      );
    }
  }]);

  return FormError;
}(_react2.default.Component);

var _InputWrapper = (_temp = _class = function (_React$Component2) {
  _inherits(_InputWrapper, _React$Component2);

  function _InputWrapper() {
    _classCallCheck(this, _InputWrapper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_InputWrapper).apply(this, arguments));
  }

  _createClass(_InputWrapper, [{
    key: 'updateValue',
    value: function updateValue(e, selected) {
      // React-select does some funky stuff
      var child = _react2.default.Children.only(this.props.children);

      if (e.currentTarget) {
        this.props.updateField(e.currentTarget.value);
      } else {
        console.log('Nailed it!');
        if (child.props.multiple) {
          this.props.updateField(selected.map(function (option) {
            return option.value;
          }));
        } else {
          this.props.updateField(e.value);
        }
      }
    }
  }, {
    key: 'recursivelyCloneChildren',
    value: function recursivelyCloneChildren(children) {
      var _this3 = this;

      return _react2.default.Children.map(children, function (child) {
        if (!_react2.default.isValidElement(child)) {
          return child;
        }

        var childProps = {
          onChange: _this3.updateValue.bind(_this3),
          name: _this3.props.name,
          value: _this3.props.value,
          type: _this3.props.type
        };
        childProps.children = _this3.recursivelyCloneChildren(child.props.children);

        return _react2.default.cloneElement(child, childProps);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var className = 'form-group row';

      if (this.props.error) {
        className += ' has-danger';
      }

      var inputClass = 'col-xs-12 col-sm-8';
      if (!this.props.label) {
        inputClass = 'col-xs-12';
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        this.props.label ? _react2.default.createElement(
          'label',
          { htmlFor: this.props.name, className: 'col-xs-12 col-sm-4 form-control-label' },
          this.props.label
        ) : '',
        _react2.default.createElement(
          'div',
          { className: inputClass },
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            this.recursivelyCloneChildren(this.props.children),
            this.props.afterInput ? _react2.default.createElement(
              'span',
              { className: 'input-group-addon' },
              this.props.afterInput
            ) : null
          ),
          _react2.default.createElement(
            FormError,
            null,
            this.props.error
          )
        )
      );
    }
  }]);

  return _InputWrapper;
}(_react2.default.Component), _class.propTypes = {
  afterInput: _react2.default.PropTypes.string,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  type: _react2.default.PropTypes.string,
  error: _react2.default.PropTypes.string,
  formStore: _react2.default.PropTypes.string.isRequired
}, _class.defaultProps = {
  type: 'text',
  value: ''
}, _temp);

;

var mapStateToFormInputProps = function mapStateToFormInputProps(state, props) {
  return {
    value: state.form[props.formStore][props.name],
    error: state.form[props.formStore + '_errors'][props.name]
  };
};

var mapDispatchToFormInputProps = function mapDispatchToFormInputProps(dispatch, props) {
  return {
    updateField: function updateField(value) {
      dispatch(FormActions.updateField(props.formStore, props.name, value));
    }
  };
};

var InputWrapper = (0, _reactRedux.connect)(mapStateToFormInputProps, mapDispatchToFormInputProps)(_InputWrapper);

var FormInput = exports.FormInput = function (_React$Component3) {
  _inherits(FormInput, _React$Component3);

  function FormInput() {
    _classCallCheck(this, FormInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormInput).apply(this, arguments));
  }

  _createClass(FormInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        this.props,
        _react2.default.createElement('input', { className: 'form-control' })
      );
    }
  }]);

  return FormInput;
}(_react2.default.Component);

var PhoneInput = exports.PhoneInput = function (_React$Component4) {
  _inherits(PhoneInput, _React$Component4);

  function PhoneInput() {
    _classCallCheck(this, PhoneInput);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PhoneInput).apply(this, arguments));
  }

  _createClass(PhoneInput, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        this.props,
        _react2.default.createElement(_reactInputMask2.default, { type: 'tel', className: 'form-control', mask: '(999) 999 - 9999' })
      );
    }
  }]);

  return PhoneInput;
}(_react2.default.Component);

var _FormStatic = function (_React$Component5) {
  _inherits(_FormStatic, _React$Component5);

  function _FormStatic() {
    _classCallCheck(this, _FormStatic);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_FormStatic).apply(this, arguments));
  }

  _createClass(_FormStatic, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'p',
        { className: 'form-control-static' },
        this.props.value
      );
    }
  }]);

  return _FormStatic;
}(_react2.default.Component);

var FormStatic = exports.FormStatic = function (_React$Component6) {
  _inherits(FormStatic, _React$Component6);

  function FormStatic() {
    _classCallCheck(this, FormStatic);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FormStatic).apply(this, arguments));
  }

  _createClass(FormStatic, [{
    key: 'render',
    value: function render() {
      var className = 'form-group row';

      return _react2.default.createElement(
        InputWrapper,
        this.props,
        _react2.default.createElement(_FormStatic, null)
      );
    }
  }]);

  return FormStatic;
}(_react2.default.Component);

;

var StateSelect = exports.StateSelect = function (_React$Component7) {
  _inherits(StateSelect, _React$Component7);

  function StateSelect() {
    _classCallCheck(this, StateSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(StateSelect).apply(this, arguments));
  }

  _createClass(StateSelect, [{
    key: 'selectOptions',
    value: function selectOptions() {
      return [{ value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' }, { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' }, { value: 'DC', label: 'District Of Columbia' }, { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' }, { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' }, { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' }, { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' }, { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' }, { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' }, { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' }, { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' }, { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' }, { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' }, { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' }, { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' }, { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' }, { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' }, { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' }, { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' }, { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' }];
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        this.props,
        _react2.default.createElement(_reactSelect2.default, {
          className: 'form-control',
          clearable: false,
          options: this.selectOptions(),
          autosize: false
        })
      );
    }
  }]);

  return StateSelect;
}(_react2.default.Component);

var _Checkbox = (_temp2 = _class2 = function (_React$Component8) {
  _inherits(_Checkbox, _React$Component8);

  function _Checkbox() {
    _classCallCheck(this, _Checkbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Checkbox).apply(this, arguments));
  }

  _createClass(_Checkbox, [{
    key: 'updateChecked',
    value: function updateChecked(e) {
      this.props.updateField(e.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'checkbox' },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            type: 'checkbox',
            name: this.props.name,
            value: this.props.value,
            checked: this.props.checked,
            onChange: this.updateChecked.bind(this)
          }),
          _react2.default.createElement(
            'span',
            { className: 'checkbox-label' },
            this.props.label
          )
        )
      );
    }
  }]);

  return _Checkbox;
}(_react2.default.Component), _class2.propTypes = {
  label: _react2.default.PropTypes.string.isRequired,
  name: _react2.default.PropTypes.string.isRequired
}, _temp2);

var mapStateToCheckboxProps = function mapStateToCheckboxProps(state, props) {
  return {
    checked: state.form[props.formStore][props.name] && state.form[props.formStore][props.name][props.value]
  };
};

var mapStateToDispatchProps = function mapStateToDispatchProps(dispatch, props) {
  return {
    updateField: function updateField(checked) {
      dispatch(FormActions.updateCheckbox(props.formStore, props.name, props.value, checked));
    }
  };
};

var Checkbox = exports.Checkbox = (0, _reactRedux.connect)(mapStateToCheckboxProps, mapStateToDispatchProps)(_Checkbox);

var _ReduxForm = (_temp3 = _class3 = function (_React$Component9) {
  _inherits(_ReduxForm, _React$Component9);

  function _ReduxForm() {
    _classCallCheck(this, _ReduxForm);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_ReduxForm).apply(this, arguments));
  }

  _createClass(_ReduxForm, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchData();
    }
  }, {
    key: 'recursivelyCloneChildren',
    value: function recursivelyCloneChildren(children) {
      var _this11 = this;

      return _react2.default.Children.map(children, function (child) {
        if (!_react2.default.isValidElement(child)) {
          return child;
        }

        var childProps = { formStore: _this11.props.subStore };
        childProps.children = _this11.recursivelyCloneChildren(child.props.children);

        return _react2.default.cloneElement(child, childProps);
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this12 = this;

      event && event.preventDefault();

      this.props.submitData().then(function (res) {
        if (res && res.success === true) {

          if (_this12.props.inModal) {
            _this12.props.closeModal();
          } else if (res.redirect) {
            if (res.external && window) {
              window.location = res.redirect;
            } else {
              _this12.props.router.push(res.redirect);
            }
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.globalError) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'strong',
            null,
            this.props.globalError
          )
        );
      } else if (this.props.isLoading) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_LoadingCube2.default, { show: true })
        );
      }

      return _react2.default.createElement(
        'form',
        _extends({}, this.props, { onSubmit: this.handleSubmit.bind(this), action: '' }),
        this.recursivelyCloneChildren(this.props.children)
      );
    }
  }]);

  return _ReduxForm;
}(_react2.default.Component), _class3.propTypes = {
  submitEndpoint: _react2.default.PropTypes.string.isRequired,
  submitMethod: _react2.default.PropTypes.string.isRequired,
  fetchEndpoint: _react2.default.PropTypes.string,
  isLoading: _react2.default.PropTypes.bool,
  subStore: _react2.default.PropTypes.string.isRequired
}, _class3.defaultProps = {
  isLoading: true
}, _temp3);

var mapStateToReduxFormProps = function mapStateToReduxFormProps(state, props) {
  return {
    isLoading: state.form.loading[props.subStore],
    globalError: state.form.globalErrors[props.subStore]
  };
};

var mapDispatchToReduxFormProps = function mapDispatchToReduxFormProps(dispatch, props) {
  return {
    fetchData: function fetchData() {
      dispatch(FormActions.fetchData(props.subStore, props.fetchEndpoint));
    },
    submitData: function submitData() {
      return dispatch(FormActions.submitData(props.subStore, props.submitMethod, props.submitEndpoint));
    },
    closeModal: function closeModal() {
      dispatch(ModalActions.close());
    }
  };
};

var ReduxForm = exports.ReduxForm = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToReduxFormProps, mapDispatchToReduxFormProps)(_ReduxForm));