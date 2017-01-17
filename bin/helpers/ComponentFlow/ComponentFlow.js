'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* Fetches current view from state
   Accepts a list of components and 'next' callbacks

  {
    'slug': {
      component: (component),
      buttonAction: (action),
      buttonText (opt.): Text of 'next/submit' button,
      final (def. false): Is this the last?
    }
  } */

var _ComponentFlow = (_temp = _class = function (_React$Component) {
  _inherits(_ComponentFlow, _React$Component);

  function _ComponentFlow() {
    _classCallCheck(this, _ComponentFlow);

    return _possibleConstructorReturn(this, (_ComponentFlow.__proto__ || Object.getPrototypeOf(_ComponentFlow)).apply(this, arguments));
  }

  _createClass(_ComponentFlow, [{
    key: 'dispatchButtonAction',
    value: function dispatchButtonAction() {
      this.props.dispatchAction(this.props.flow[this.props.step].buttonAction);
    }
  }, {
    key: 'selectComponent',
    value: function selectComponent() {
      var _props = this.props,
          flow = _props.flow,
          step = _props.step;


      if (flow[step] && flow[step].component) {
        return flow[step].component;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          flow = _props2.flow,
          step = _props2.step;

      var CurrentComponent = this.selectComponent();

      var buttonClasses = 'btn btn-info btn-block';
      if (flow[step] && flow[step].final) {
        buttonClasses = 'btn btn-block btn-success';
      }

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(CurrentComponent, this.props),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-12 offset-sm-4 col-sm-6' },
            _react2.default.createElement(
              'button',
              { className: buttonClasses, onClick: this.dispatchButtonAction.bind(this) },
              flow[step].buttonText ? flow[step].buttonText : 'Continue'
            )
          )
        )
      );
    }
  }]);

  return _ComponentFlow;
}(_react2.default.Component), _class.propTypes = {
  flow: _react2.default.PropTypes.object.isRequired,
  step: _react2.default.PropTypes.string
}, _class.defaultProps = {
  step: 'root'
}, _temp);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    formState: state.form
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    dispatchAction: function dispatchAction(action) {
      return dispatch(action);
    }
  };
};

var ComponentFlow = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ComponentFlow);
exports.default = ComponentFlow;
module.exports = exports['default'];