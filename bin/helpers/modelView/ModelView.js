'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _LoadingCube = require('../LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _ModelViewActions = require('./ModelViewActions');

var actions = _interopRequireWildcard(_ModelViewActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ModelView = (_temp = _class = function (_React$Component) {
  _inherits(_ModelView, _React$Component);

  function _ModelView() {
    _classCallCheck(this, _ModelView);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_ModelView).apply(this, arguments));
  }

  _createClass(_ModelView, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.dumpContents();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.fetchModel();
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.error) {
        return _react2.default.createElement(
          'strong',
          null,
          this.props.error
        );
      }

      if (this.props.isLoading) {
        return _react2.default.createElement(_LoadingCube2.default, { show: true });
      }

      if (!this.props.model) {
        if (this.props.returnEmpty) {
          return _react2.default.createElement('div', null);
        }

        return _react2.default.createElement(
          'strong',
          null,
          'Nothing to display.'
        );
      }

      return _react2.default.createElement(this.props.component, { model: this.props.model });
    }
  }]);

  return _ModelView;
}(_react2.default.Component), _class.propTypes = {
  endpoint: _react2.default.PropTypes.string.isRequired,
  subStore: _react2.default.PropTypes.string.isRequired,
  error: _react2.default.PropTypes.string,
  isLoading: _react2.default.PropTypes.bool
}, _class.defaultProps = {
  isLoading: true
}, _temp);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    model: state.modelView[props.subStore],
    error: state.modelView.error,
    isLoading: state.modelView.isLoading
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    fetchModel: function fetchModel() {
      return dispatch(actions.fetchModel(props.endpoint, props.subStore));
    },
    dumpContents: function dumpContents() {
      dispatch(actions.dumpContents(props.subStore));
    }
  };
};

var ModelView = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ModelView);
exports.default = ModelView;
module.exports = exports['default'];