'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reduxForm = require('redux-form');

var _components = require('../../forms/components');

var _LoadingCube = require('../../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _UserActions = require('./UserActions');

var UserActions = _interopRequireWildcard(_UserActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Edit = (_temp = _class = function (_React$Component) {
  _inherits(_Edit, _React$Component);

  function _Edit() {
    _classCallCheck(this, _Edit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Edit).apply(this, arguments));
  }

  _createClass(_Edit, [{
    key: 'editSubmit',
    value: function editSubmit(values) {
      console.log('VALUES ARE ', values);

      this.props.submitEditData(values).then(function (data) {
        // do stuff
      }).catch(function (errors) {
        throw new _reduxForm.SubmissionError(errors);
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchUserData(this.props.email);
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.isLoading) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_LoadingCube2.default, { show: true })
        );
      }

      console.log(this.props.initialValues);

      return _react2.default.createElement(
        'form',
        { onSubmit: this.props.handleSubmit(this.editSubmit.bind(this)) },
        _react2.default.createElement(_components.FormStatic, { name: 'email', label: 'Email', fill: this.props.initialValues.email }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'first_name', label: 'First Name' }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'mi', label: 'Middle Initial' }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'last_name', label: 'Last Name' }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'street', label: 'Street' }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'address_2', label: 'Address 2' }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'city', label: 'City' }),
        _react2.default.createElement(_reduxForm.Field, { component: _components.LiberatedFormInput, name: 'zip', label: 'ZIP' }),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'pull-center' },
            _react2.default.createElement(
              'button',
              { type: 'submit', className: 'pull-center btn btn-success', disabled: this.props.submitting },
              'Save Changes'
            )
          )
        )
      );
    }
  }]);

  return _Edit;
}(_react2.default.Component), _class.defaultProps = {
  isLoading: true
}, _temp);

var mapStateToEditProps = function mapStateToEditProps(state) {
  return {
    initialValues: state.users.editFormData,
    isLoading: state.users.editFormLoading
  };
};

var mapDispatchToEditProps = function mapDispatchToEditProps(dispatch) {
  return {
    fetchUserData: function fetchUserData(email) {
      dispatch(UserActions.fetchEditData(email));
    },
    submitEditData: function submitEditData(values) {
      return dispatch(UserActions.submitEditData(values));
    }
  };
};

var rf_Edit = (0, _reduxForm.reduxForm)({
  form: 'userEditForm'
})(_Edit);

var Edit = exports.Edit = (0, _reactRedux.connect)(mapStateToEditProps, mapDispatchToEditProps)(rf_Edit);