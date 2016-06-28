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
    key: 'submit',
    value: function submit(e) {
      e.preventDefault();
      var formData = new FormData(e.target);

      this.props.submitEditData(formData);
    }

    // TODO tomorrow: Create a form container component to manage state and take care of everything so that
    //    EditForm can be completely dumb. Should affect LiberatedFormInput and FormStatic and override onSubmit.
    //    Validation happens server-side, so it only needs an endpoint, identifier, and formStore [subStore?]

  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchUserData(this.props.email);
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
            'Error: ',
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

      //const values = this.props.values;
      //const errors = this.props.errors;
      //console.log(values);

      console.log('Getting ready to return.');
      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'user_edit'
          //onSubmit={ this.submit.bind(this) }
        },
        _react2.default.createElement(_components.FormStatic, { name: 'email', label: 'Email' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'first_name', label: 'First Name' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'mi', label: 'Middle Initial' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'last_name', label: 'Last Name' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'street', label: 'Street' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'address_2', label: 'Address 2' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'city', label: 'City' }),
        _react2.default.createElement(_components.LiberatedFormInput, { name: 'zip', label: 'ZIP' }),
        _react2.default.createElement(
          'button',
          { name: 'submit', type: 'submit', className: 'btn btn-success btn-block' },
          'Save Changes'
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
    //values: state.users.editFormData,
    isLoading: state.users.editFormLoading,
    globalError: state.users.editFormError
  };
};

//errors: state.users.editFormErrors
var mapDispatchToEditProps = function mapDispatchToEditProps(dispatch) {
  return {
    fetchUserData: function fetchUserData(email) {
      dispatch(UserActions.fetchEditData(email));
    },
    submitEditData: function submitEditData(formData) {
      dispatch(UserActions.submitEditData(formData));
    }
  };
};

var Edit = exports.Edit = (0, _reactRedux.connect)(mapStateToEditProps, mapDispatchToEditProps)(_Edit);