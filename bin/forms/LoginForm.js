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

var _AuthActions = require('../models/Auth/AuthActions');

var AuthActions = _interopRequireWildcard(_AuthActions);

var _components = require('./components');

var _ProgressButton = require('../helpers/ProgressButton');

var _ProgressButton2 = _interopRequireDefault(_ProgressButton);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _LoginForm = function (_React$Component) {
  _inherits(_LoginForm, _React$Component);

  function _LoginForm() {
    _classCallCheck(this, _LoginForm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_LoginForm).call(this));

    _this.state = {
      canSubmit: false,
      buttonState: 'error'
    };
    return _this;
  }

  _createClass(_LoginForm, [{
    key: 'submit',
    value: function submit(data, reset, errors) {
      var _this2 = this;

      console.log("We'll also do some validation.");
      console.log(data);

      this.setState({ buttonState: 'loading' });
      (0, _isomorphicFetch2.default)('/auth/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      }).then(function (response) {
        return response.json();
      }).then(function (res) {
        if (res.success == false) {
          _this2.setState({ buttonState: 'error' });
          return errors({
            password: res.message
          });
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _formsyReact2.default.Form,
        {
          onValidSubmit: this.submit.bind(this),
          onValid: function onValid() {
            _this3.setState({ buttonState: '' });
          },
          onInvalid: function onInvalid() {
            _this3.setState({ buttonState: 'error' });
          },
          noValidate: 'true'
        },
        _react2.default.createElement(_components.FormInput, {
          name: 'email',
          label: 'Email Address',
          inputType: 'email',
          placeholder: 'Enter your email address.',
          validations: 'isEmail',
          validationErrors: {
            isEmail: 'This doesn’t look like a valid email address.'
          }
          //defaultValue=""
          , required: true
        }),
        _react2.default.createElement(_components.FormInput, {
          name: 'password',
          label: 'Password',
          inputType: 'password',
          placeholder: 'Enter your password.',
          validationHook: 'change'
          //defaultValue=""
          , required: true
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
            'Log In'
          )
        )
      );
    }
  }]);

  return _LoginForm;
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

var LoginForm = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_LoginForm));
exports.default = LoginForm;