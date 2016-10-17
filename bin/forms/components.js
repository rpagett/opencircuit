'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxForm = exports.EventChecks = exports.Radio = exports.Checkbox = exports.DateTime = exports.StateSelect = exports.DaypartSelect = exports.UserSelect = exports.UnitTypeSelect = exports.FeeCategorySelect = exports.UnitSelect = exports.PaymentTypeSelect = exports.ClassSelect = exports.TextArea = exports.FormStatic = exports.PhoneInput = exports.FormInput = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp, _class2, _temp2, _class3, _temp3, _class4, _temp4, _class5, _temp5, _class6, _temp6;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _reactInputMask = require('react-input-mask');

var _reactInputMask2 = _interopRequireDefault(_reactInputMask);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _ContentsView = require('../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

var _functions = require('../helpers/functions');

var _FormActions = require('./FormActions');

var FormActions = _interopRequireWildcard(_FormActions);

var _ModalActions = require('../modals/ModalActions');

var ModalActions = _interopRequireWildcard(_ModalActions);

var _LoadingCube = require('../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _dayparts = require('../helpers/dayparts');

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
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.value) {
        var value = this.props.value;

        if (value instanceof Date) {
          console.log('It\'s a Date!');
          value = (0, _moment2.default)(value);
        } else if (value instanceof Object) {
          value = value._id;
        }

        this.props.updateField(value);
      }
    }
  }, {
    key: 'updateValue',
    value: function updateValue(e) {
      // React-select does some funky stuff
      //const child = React.Children.only(this.props.children);

      if (e.currentTarget) {
        this.props.updateField(e.currentTarget.value);
      } else if (e._isAMomentObject) {
        this.props.updateField(e.toDate());
      } else {
        console.log('Nailed it!');
        //if (child.props.multiple) {
        //  this.props.updateField(selected.map(option => option.value));
        //}
        //else {
        this.props.updateField(e.value);
        //}
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

        if (_this3.props.value instanceof Date) {
          console.log('It\'s a Date!');
          childProps.value = (0, _moment2.default)(_this3.props.value);
        } else if (_this3.props.value instanceof Object) {
          console.log('Coercing object for ', _this3.props.name);
          childProps.valueKey = _this3.props.value._id;
        }

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

      var labelClass = 'form-control-label col-xs-12';
      var inputClass = 'col-xs-12';
      if (this.props.label && this.props.horizontal) {
        inputClass += ' col-sm-8';
        labelClass += ' col-sm-4';
      }

      if (this.props.inputClass) {
        inputClass += ' ' + this.props.inputClass;
      }

      return _react2.default.createElement(
        'div',
        { className: className },
        this.props.label ? _react2.default.createElement(
          'label',
          { htmlFor: this.props.name, className: labelClass },
          this.props.label
        ) : '',
        _react2.default.createElement(
          'div',
          { className: inputClass },
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            this.props.beforeInput ? _react2.default.createElement(
              'span',
              { className: 'input-group-addon' },
              this.props.beforeInput
            ) : null,
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
  beforeInput: _react2.default.PropTypes.string,
  error: _react2.default.PropTypes.string,
  formStore: _react2.default.PropTypes.string.isRequired,
  horizontal: _react2.default.PropTypes.bool,
  label: _react2.default.PropTypes.string,
  name: _react2.default.PropTypes.string.isRequired,
  type: _react2.default.PropTypes.string
}, _class.defaultProps = {
  horizontal: true,
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

var TextArea = exports.TextArea = function (_React$Component7) {
  _inherits(TextArea, _React$Component7);

  function TextArea() {
    _classCallCheck(this, TextArea);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TextArea).apply(this, arguments));
  }

  _createClass(TextArea, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({ horizontal: false }, this.props),
        _react2.default.createElement('textarea', { className: 'form-control' })
      );
    }
  }]);

  return TextArea;
}(_react2.default.Component);

var ClassSelect = exports.ClassSelect = (_temp2 = _class2 = function (_React$Component8) {
  _inherits(ClassSelect, _React$Component8);

  function ClassSelect() {
    _classCallCheck(this, ClassSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ClassSelect).apply(this, arguments));
  }

  _createClass(ClassSelect, [{
    key: 'fetchList',
    value: function fetchList() {
      var endpoint = '/api/unittypes/' + this.props.unitType + '/classes';

      if (this.props.scholastic) {
        endpoint += '/scholastic';
      }
      return (0, _functions.fetchAPI)(endpoint).then(function (res) {
        return res.json();
      }).then(function (json) {
        return { options: json };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputClass: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default.Async, {
          className: 'form-control',
          clearable: false,
          loadOptions: this.fetchList.bind(this)
          //filterOption={ function() { return true; } }
          , autosize: false
        })
      );
    }
  }]);

  return ClassSelect;
}(_react2.default.Component), _class2.propTypes = {
  unitType: _react2.default.PropTypes.string.isRequired,
  scholastic: _react2.default.PropTypes.bool.isRequired
}, _temp2);

var PaymentTypeSelect = exports.PaymentTypeSelect = function (_React$Component9) {
  _inherits(PaymentTypeSelect, _React$Component9);

  function PaymentTypeSelect() {
    _classCallCheck(this, PaymentTypeSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(PaymentTypeSelect).apply(this, arguments));
  }

  _createClass(PaymentTypeSelect, [{
    key: 'fetchList',
    value: function fetchList() {
      var endpoint = '/api/fees/paymentTypes';

      return (0, _functions.fetchAPI)(endpoint).then(function (res) {
        return res.json();
      }).then(function (json) {
        return { options: json };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputClass: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default.Async, {
          className: 'form-control',
          clearable: false,
          loadOptions: this.fetchList.bind(this),
          autosize: false,
          searchable: false
        })
      );
    }
  }]);

  return PaymentTypeSelect;
}(_react2.default.Component);

var UnitSelect = exports.UnitSelect = function (_React$Component10) {
  _inherits(UnitSelect, _React$Component10);

  function UnitSelect() {
    _classCallCheck(this, UnitSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnitSelect).apply(this, arguments));
  }

  _createClass(UnitSelect, [{
    key: 'fetchList',
    value: function fetchList() {
      var endpoint = '/api/units/select';

      return (0, _functions.fetchAPI)(endpoint).then(function (res) {
        return res.json();
      }).then(function (json) {
        return { options: json };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputClass: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default.Async, {
          className: 'form-control',
          clearable: false,
          loadOptions: this.fetchList.bind(this),
          autosize: false
        })
      );
    }
  }]);

  return UnitSelect;
}(_react2.default.Component);

var FeeCategorySelect = exports.FeeCategorySelect = function (_React$Component11) {
  _inherits(FeeCategorySelect, _React$Component11);

  function FeeCategorySelect() {
    _classCallCheck(this, FeeCategorySelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(FeeCategorySelect).apply(this, arguments));
  }

  _createClass(FeeCategorySelect, [{
    key: 'fetchList',
    value: function fetchList() {
      var endpoint = '/api/feecategories/select';

      return (0, _functions.fetchAPI)(endpoint).then(function (res) {
        return res.json();
      }).then(function (json) {
        return { options: json };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputClass: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default.Async, {
          className: 'form-control',
          clearable: false,
          loadOptions: this.fetchList.bind(this),
          autosize: false,
          searchable: false
        })
      );
    }
  }]);

  return FeeCategorySelect;
}(_react2.default.Component);

var UnitTypeSelect = exports.UnitTypeSelect = function (_React$Component12) {
  _inherits(UnitTypeSelect, _React$Component12);

  function UnitTypeSelect() {
    _classCallCheck(this, UnitTypeSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UnitTypeSelect).apply(this, arguments));
  }

  _createClass(UnitTypeSelect, [{
    key: 'fetchList',
    value: function fetchList() {
      return (0, _functions.fetchAPI)('/api/unittypes/select').then(function (res) {
        return res.json();
      }).then(function (json) {
        return { options: json };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputSelect: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default.Async, {
          className: 'form-control',
          clearable: false,
          loadOptions: this.fetchList.bind(this),
          filterOption: function filterOption() {
            return true;
          },
          autosize: false
        })
      );
    }
  }]);

  return UnitTypeSelect;
}(_react2.default.Component);

var UserSelect = exports.UserSelect = function (_React$Component13) {
  _inherits(UserSelect, _React$Component13);

  function UserSelect() {
    _classCallCheck(this, UserSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UserSelect).apply(this, arguments));
  }

  _createClass(UserSelect, [{
    key: 'fetchList',
    value: function fetchList() {
      return (0, _functions.fetchAPI)('/api/users/select').then(function (res) {
        return res.json();
      }).then(function (json) {
        return { options: json };
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputClass: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default.Async, {
          className: 'form-control',
          clearable: false,
          loadOptions: this.fetchList.bind(this),
          autosize: false
        })
      );
    }
  }]);

  return UserSelect;
}(_react2.default.Component);

var DaypartSelect = exports.DaypartSelect = function (_React$Component14) {
  _inherits(DaypartSelect, _React$Component14);

  function DaypartSelect() {
    _classCallCheck(this, DaypartSelect);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DaypartSelect).apply(this, arguments));
  }

  _createClass(DaypartSelect, [{
    key: 'selectOptions',
    value: function selectOptions() {
      var options = [];
      for (var key in _dayparts.DaypartLabels) {
        options.push({
          value: key,
          label: _dayparts.DaypartLabels[key]
        });
      }

      return options;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        _extends({}, this.props, { inputClass: 'select-group' }),
        _react2.default.createElement(_reactSelect2.default, {
          className: 'form-control',
          clearable: false,
          options: this.selectOptions(),
          autosize: false
        })
      );
    }
  }]);

  return DaypartSelect;
}(_react2.default.Component);

var StateSelect = exports.StateSelect = function (_React$Component15) {
  _inherits(StateSelect, _React$Component15);

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
        _extends({}, this.props, { inputClass: 'select-group' }),
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

var DateTime = exports.DateTime = function (_React$Component16) {
  _inherits(DateTime, _React$Component16);

  function DateTime() {
    _classCallCheck(this, DateTime);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(DateTime).apply(this, arguments));
  }

  _createClass(DateTime, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        InputWrapper,
        this.props,
        _react2.default.createElement(_reactDatetime2.default, {
          strict: false,
          strictParsing: false,
          inputProps: {
            className: 'form-control'
          },
          value: this.props.value
        })
      );
    }
  }]);

  return DateTime;
}(_react2.default.Component);

var _Checkbox = (_temp3 = _class3 = function (_React$Component17) {
  _inherits(_Checkbox, _React$Component17);

  function _Checkbox() {
    _classCallCheck(this, _Checkbox);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Checkbox).apply(this, arguments));
  }

  _createClass(_Checkbox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.inForm) {
        this.props.updateField(this.props.preChecked);
      } else {
        this.props.updateCheckbox(this.props.preChecked);
      }
    }
  }, {
    key: 'updateChecked',
    value: function updateChecked(e) {
      if (this.props.inForm) {
        this.props.updateField(e.target.checked);
      } else {
        this.props.updateCheckbox(e.target.checked);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.inForm) {
        return _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-10 col-sm-4 form-control-label' },
            this.props.label
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-2 col-sm-8' },
            _react2.default.createElement('input', {
              type: 'checkbox',
              className: 'form-control',
              name: this.props.name,
              checked: this.props.formChecked || this.props.preChecked,
              onChange: this.updateChecked.bind(this)
            })
          )
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'checkbox form-check' },
          _react2.default.createElement(
            'label',
            null,
            _react2.default.createElement('input', {
              type: 'checkbox',
              className: 'form-check-input',
              name: this.props.name,
              value: this.props.value,
              checked: this.props.checked,
              onChange: this.updateChecked.bind(this)
            }),
            _react2.default.createElement(
              'span',
              { className: 'checkbox-label form-check-label' },
              this.props.label
            )
          )
        );
      }
    }
  }]);

  return _Checkbox;
}(_react2.default.Component), _class3.propTypes = {
  label: _react2.default.PropTypes.string.isRequired,
  name: _react2.default.PropTypes.string.isRequired
}, _temp3);

var mapStateToCheckboxProps = function mapStateToCheckboxProps(state, props) {
  return {
    checked: state.form[props.formStore][props.name] && state.form[props.formStore][props.name][props.value],
    formChecked: state.form[props.formStore][props.name]
  };
};

var mapDispatchToCheckboxProps = function mapDispatchToCheckboxProps(dispatch, props) {
  return {
    updateCheckbox: function updateCheckbox(checked) {
      dispatch(FormActions.updateCheckbox(props.formStore, props.name, props.value, checked));
    },
    updateField: function updateField(checked) {
      dispatch(FormActions.updateField(props.formStore, props.name, checked));
    }
  };
};

var Checkbox = exports.Checkbox = (0, _reactRedux.connect)(mapStateToCheckboxProps, mapDispatchToCheckboxProps)(_Checkbox);

var _Radio = (_temp4 = _class4 = function (_React$Component18) {
  _inherits(_Radio, _React$Component18);

  function _Radio() {
    _classCallCheck(this, _Radio);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Radio).apply(this, arguments));
  }

  _createClass(_Radio, [{
    key: 'updateChecked',
    value: function updateChecked(e) {
      this.props.updateField(e.target.checked);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'radio' },
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement('input', {
            type: 'radio',
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

  return _Radio;
}(_react2.default.Component), _class4.propTypes = {
  label: _react2.default.PropTypes.string.isRequired,
  name: _react2.default.PropTypes.string.isRequired
}, _temp4);

var mapStateToRadioProps = function mapStateToRadioProps(state, props) {
  return {
    formChecked: state.form[props.formStore][props.name] === props.value
  };
};

var mapDispatchToRadioProps = function mapDispatchToRadioProps(dispatch, props) {
  return {
    updateField: function updateField(checked) {
      dispatch(FormActions.updateField(props.formStore, props.name, props.value));
    }
  };
};

var Radio = exports.Radio = (0, _reactRedux.connect)(mapStateToCheckboxProps, mapDispatchToRadioProps)(_Radio);

var _EventChecks = (_temp5 = _class5 = function (_React$Component19) {
  _inherits(_EventChecks, _React$Component19);

  function _EventChecks() {
    _classCallCheck(this, _EventChecks);

    var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(_EventChecks).call(this));

    _this20.state = {
      isLoading: true
    };
    return _this20;
  }

  _createClass(_EventChecks, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this21 = this;

      (0, _functions.fetchAPI)(this.props.endpoint).then(function (res) {
        return res.json();
      }).then(function (json) {
        _this21.setState({
          isLoading: false,
          events: json.events
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this22 = this;

      var boxes = [];

      if (this.state.isLoading) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_LoadingCube2.default, { show: true })
        );
      }

      console.log(this.state.events);

      if (!this.state.events) {
        return _react2.default.createElement(
          'p',
          null,
          'No events available at this time.'
        );
      }

      this.state.events.map(function (event) {
        boxes.push(_react2.default.createElement(
          'div',
          { className: 'col-xs-12', key: 'col-' + event.id },
          _react2.default.createElement(Checkbox, {
            name: 'events',
            formStore: _this22.props.formStore,
            key: event._id,
            label: event.name + ' (' + event.formattedDate + ')',
            value: event._id,
            preChecked: event.attending
          })
        ));
      });

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        boxes
      );
    }
  }]);

  return _EventChecks;
}(_react2.default.Component), _class5.propTypes = {
  endpoint: _react2.default.PropTypes.string.isRequired
}, _temp5);

var EventChecks = exports.EventChecks = function (_React$Component20) {
  _inherits(EventChecks, _React$Component20);

  function EventChecks() {
    _classCallCheck(this, EventChecks);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(EventChecks).apply(this, arguments));
  }

  _createClass(EventChecks, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_EventChecks, {
        unitType: this.props.unitType,
        endpoint: this.props.endpoint,
        formStore: this.props.formStore,
        subStore: 'event_checks',
        component: _EventChecks
      });
    }
  }]);

  return EventChecks;
}(_react2.default.Component);

var _ReduxForm = (_temp6 = _class6 = function (_React$Component21) {
  _inherits(_ReduxForm, _React$Component21);

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
      var _this25 = this;

      return _react2.default.Children.map(children, function (child) {
        if (!_react2.default.isValidElement(child)) {
          return child;
        }

        var childProps = { formStore: _this25.props.subStore, formModel: _this25.props.formModel };
        childProps.children = _this25.recursivelyCloneChildren(child.props.children);

        return _react2.default.cloneElement(child, childProps);
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      var _this26 = this;

      event && event.preventDefault();

      this.props.submitData().then(function (res) {
        if (res && res.success === true) {

          if (_this26.props.inModal) {
            _this26.props.closeModal();
          }

          if (res.redirect) {
            if (res.external && window) {
              window.location = res.redirect;
            } else {
              _this26.props.router.push(res.redirect);
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
}(_react2.default.Component), _class6.propTypes = {
  submitEndpoint: _react2.default.PropTypes.string.isRequired,
  submitMethod: _react2.default.PropTypes.string.isRequired,
  fetchEndpoint: _react2.default.PropTypes.string,
  isLoading: _react2.default.PropTypes.bool,
  subStore: _react2.default.PropTypes.string.isRequired
}, _class6.defaultProps = {
  isLoading: true
}, _temp6);

var mapStateToReduxFormProps = function mapStateToReduxFormProps(state, props) {
  return {
    isLoading: state.form.loading[props.subStore],
    globalError: state.form.globalErrors[props.subStore],
    formModel: state.form[props.subStore]
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