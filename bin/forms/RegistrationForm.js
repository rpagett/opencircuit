'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formsyReact = require('formsy-react');

var _formsyReact2 = _interopRequireDefault(_formsyReact);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _reactRouter = require('react-router');

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _AuthActions = require('../actions/AuthActions');

var AuthActions = _interopRequireWildcard(_AuthActions);

var _components = require('./components');

var _ProgressButton = require('../helpers/ProgressButton');

var _ProgressButton2 = _interopRequireDefault(_ProgressButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _RegistrationForm = function (_React$Component) {
  _inherits(_RegistrationForm, _React$Component);

  function _RegistrationForm() {
    _classCallCheck(this, _RegistrationForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_RegistrationForm).call(this));

    _this.state = {
      canSubmit: false,
      buttonState: 'error'
    };
    return _this;
  }

  _createClass(_RegistrationForm, [{
    key: 'submit',
    value: function submit(data, reset, errors) {
      var _this2 = this;

      console.log(data);

      this.setState({ buttonState: 'loading' });
      (0, _isomorphicFetch2.default)('/auth/register', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        if (res.success == false) {
          _this2.setState({ buttonState: 'error' });
          if (res.cause == 'validation') {
            return errors(res.messages);
          } else {
            return errors({
              email: res.message.message
            });
          }
        } else if (res.success == true) {
          _this2.setState({ buttonState: 'success' });
          _this2.props.dispatchLogin(res.user);
          _this2.props.router.push('/');
        }
        console.log(res);
      });

      return;
    }
  }, {
    key: 'enableButton',
    value: function enableButton() {
      this.setState({ buttonState: '' });
    }
  }, {
    key: 'disableButton',
    value: function disableButton() {
      this.setState({ buttonState: 'error' });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _formsyReact2.default.Form,
        {
          onValidSubmit: this.submit.bind(this),
          onValid: this.enableButton.bind(this),
          onInvalid: this.disableButton.bind(this)
          //noValidate="true"
        },
        _react2.default.createElement(_components.FormInput, {
          name: 'email',
          label: 'Email Address',
          inputType: 'email',
          placeholder: 'Enter your email address.',
          validations: 'isEmail',
          validationErrors: {
            isEmail: 'This doesn’t look like a valid email address.'
          },
          required: true
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'password',
          label: 'Password',
          inputType: 'password',
          placeholder: 'Enter your desired password.',
          validationHook: 'change',
          required: true
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'password-verify',
          label: 'Verify Password',
          inputType: 'password',
          placeholder: 'Enter your password again.',
          validations: 'equalsField:password',
          validationErrors: {
            equalsField: 'Your passwords must match.'
          },
          required: true
        }),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(_components.FormInput, {
          name: 'first-name',
          label: 'First Name',
          inputType: 'text',
          validationHook: 'change',
          validations: 'isExisty',
          required: true
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'mi',
          label: 'Middle Initial (opt.)',
          inputType: 'text',
          maxLength: '1',
          afterInput: '.',
          validationHook: 'change',
          validations: 'isAlpha',
          validationError: 'The initial must be a letter.'
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'last-name',
          label: 'Last Name',
          inputType: 'text',
          validationHook: 'change',
          validations: 'isExisty',
          required: true
        }),
        _react2.default.createElement(_components.PhoneInput, {
          name: 'phone',
          label: 'Phone',
          beforeInput: '+1'
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'street',
          label: 'Street',
          inputType: 'text',
          validationHook: 'change',
          validations: 'isExisty',
          required: true
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'address-2',
          label: 'Address 2 (opt.)',
          inputType: 'text'
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'city',
          label: 'City',
          inputType: 'text',
          validationHook: 'change',
          validations: 'isExisty',
          required: true
        }),
        _react2.default.createElement(_components.StateSelect, {
          name: 'state',
          label: 'State',
          required: true
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'zip',
          label: 'ZIP',
          inputType: 'text',
          validationHook: 'change',
          validations: {
            isExisty: true,
            isNumeric: true
          },
          maxLength: '5',
          required: true
        }),
        _react2.default.createElement(
          'div',
          { className: 'form-group row' },
          _react2.default.createElement(
            _ProgressButton2.default,
            {
              type: 'submit',
              ref: 'submit',
              state: this.state.buttonState
            },
            'Register'
          )
        )
      );
    }
  }]);

  return _RegistrationForm;
}(_react2.default.Component);

;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchLogin: function dispatchLogin(user) {
      dispatch(AuthActions.loginUser(user));
    }
  };
};

var RegistrationForm = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_RegistrationForm));
exports.default = RegistrationForm;