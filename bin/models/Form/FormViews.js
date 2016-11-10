'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReviewList = exports.Review = exports.Verify = exports.View = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _functions = require('../../helpers/functions');

var _SpawnableModal = require('../../modals/SpawnableModal');

var _UserRoles = require('../User/UserRoles');

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _FormList = require('./FormList');

var _FormList2 = _interopRequireDefault(_FormList);

var _ObligatedUnitsList = require('./ObligatedUnitsList');

var _ObligatedUnitsList2 = _interopRequireDefault(_ObligatedUnitsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = exports.Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
  }

  _createClass(Index, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Forms'
        ),
        _react2.default.createElement(_FormList2.default, { endpoint: '/api/forms' }),
        _react2.default.createElement(
          _UserRoles.HasRole,
          { role: _UserRoles.UserRoles.Administrator },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('hr', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'pull-xs-center col-xs-12 offset-sm-4 col-sm-4' },
              _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
                className: 'btn btn-sm btn-outline-secondary btn-block',
                buttonText: 'Create Form',

                title: 'Create Form',
                componentName: 'FORM_CREATE_FORM',
                modalProps: {
                  refreshTable: 'formList',
                  refreshEndpoint: '/api/forms'
                }
              })
            )
          )
        )
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var View = exports.View = function (_React$Component2) {
  _inherits(View, _React$Component2);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(View).apply(this, arguments));
  }

  _createClass(View, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Obligated Units'
        ),
        _react2.default.createElement(_ObligatedUnitsList2.default, { endpoint: '/api/forms/' + this.props.params.form_id + '/assign' })
      );
    }
  }]);

  return View;
}(_react2.default.Component);

var _Verify = function (_React$Component3) {
  _inherits(_Verify, _React$Component3);

  function _Verify() {
    _classCallCheck(this, _Verify);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Verify).apply(this, arguments));
  }

  _createClass(_Verify, [{
    key: 'submit',
    value: function submit() {
      var _this4 = this;

      (0, _functions.fetchAPI)('/api/forms/verify/' + this.props.params.unit + '/' + this.props.params.form, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.props.authUser.apiToken
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this4.props.router.push(res.redirect);
      }).catch(function (error) {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.props.router.push('/');
    }
  }, {
    key: 'render',
    value: function render() {
      var url = 'http://opencircuit.us/api/forms/submission/' + this.props.params.unit + '/' + this.props.params.form;
      var fullUrl = 'https://docs.google.com/viewer?url=' + url + '&embedded=true';

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'pdf-header col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-sm-8' },
                _react2.default.createElement(
                  'p',
                  { className: 'pdf-text' },
                  'Please verify that the form is correct.'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-6 col-sm-2' },
                _react2.default.createElement(
                  'button',
                  {
                    role: 'button',
                    className: 'btn btn-sm btn-block btn-success',
                    onClick: this.submit.bind(this)
                  },
                  'Submit'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-6 col-sm-2' },
                _react2.default.createElement(
                  'button',
                  {
                    role: 'button',
                    className: 'btn btn-sm btn-block btn-danger',
                    onClick: this.cancel.bind(this)
                  },
                  'Cancel'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement('iframe', {
            src: fullUrl,
            style: { 'width': '100%', 'height': '100vh', 'border': 'none' }
          })
        )
      );
    }
  }]);

  return _Verify;
}(_react2.default.Component);

var Verify = exports.Verify = (0, _reactRouter.withRouter)((0, _functions.authConnect)(_Verify));

var _Review = function (_React$Component4) {
  _inherits(_Review, _React$Component4);

  function _Review() {
    _classCallCheck(this, _Review);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Review).apply(this, arguments));
  }

  _createClass(_Review, [{
    key: 'submit',
    value: function submit() {
      var _this6 = this;

      (0, _functions.fetchAPI)('/api/forms/review/' + this.props.params.unit + '/' + this.props.params.form, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.props.authUser.apiToken
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this6.props.router.push(res.redirect);
      }).catch(function (error) {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
    }
  }, {
    key: 'reject',
    value: function reject() {
      var _this7 = this;

      (0, _functions.fetchAPI)('/api/forms/review/' + this.props.params.unit + '/' + this.props.params.form, {
        credentials: 'same-origin',
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.props.authUser.apiToken
        }
      }).then(function (res) {
        return res.json();
      }).then(function (res) {
        _this7.props.router.push(res.redirect);
      }).catch(function (error) {
        console.log('In catch block', error);
        dispatch(setError(subStore, error));
      });
    }
  }, {
    key: 'cancel',
    value: function cancel() {
      this.props.router.push('/');
    }
  }, {
    key: 'render',
    value: function render() {
      var url = 'http://opencircuit.us/api/forms/submission/' + this.props.params.unit + '/' + this.props.params.form;
      var fullUrl = 'https://docs.google.com/viewer?url=' + url + '&embedded=true';

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'pdf-header col-xs-12' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-xs-12 col-sm-8' },
                _react2.default.createElement(
                  'p',
                  { className: 'pdf-text' },
                  'Please verify that the form is correct.'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-6 col-sm-2' },
                _react2.default.createElement(
                  'button',
                  {
                    role: 'button',
                    className: 'btn btn-sm btn-block btn-success',
                    onClick: this.submit.bind(this)
                  },
                  'Approve'
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-xs-6 col-sm-2' },
                _react2.default.createElement(
                  'button',
                  {
                    role: 'button',
                    className: 'btn btn-sm btn-block btn-danger',
                    onClick: this.reject.bind(this)
                  },
                  'Reject'
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement('iframe', {
            src: fullUrl,
            style: { 'width': '100%', 'height': '100vh', 'border': 'none' }
          })
        )
      );
    }
  }]);

  return _Review;
}(_react2.default.Component);

var Review = exports.Review = (0, _reactRouter.withRouter)((0, _functions.authConnect)(_Review));

var ReviewList = exports.ReviewList = function (_React$Component5) {
  _inherits(ReviewList, _React$Component5);

  function ReviewList() {
    _classCallCheck(this, ReviewList);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ReviewList).apply(this, arguments));
  }

  _createClass(ReviewList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Forms Needing Review'
        ),
        _react2.default.createElement(_ObligatedUnitsList2.default, { endpoint: '/api/forms/review' })
      );
    }
  }]);

  return ReviewList;
}(_react2.default.Component);