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

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_ComponentFlow).apply(this, arguments));
  }

  _createClass(_ComponentFlow, [{
    key: 'dispatchButtonAction',
    value: function dispatchButtonAction() {
      this.props.dispatchAction(this.props.flow[this.props.currentSlug].buttonAction);
    }
  }, {
    key: 'selectComponent',
    value: function selectComponent() {
      var _props = this.props;
      var flow = _props.flow;
      var currentSlug = _props.currentSlug;


      if (flow[currentSlug] && flow[currentSlug].component) {
        return flow[currentSlug].component;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var flow = _props2.flow;
      var currentSlug = _props2.currentSlug;

      var CurrentComponent = this.selectComponent();

      var buttonClasses = 'btn btn-info btn-block';
      if (flow[currentSlug] && flow[currentSlug].final) {
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
            { className: 'col-xs-12 col-sm-offset-3 col-sm-6' },
            _react2.default.createElement(
              'button',
              { className: buttonClasses, onClick: this.dispatchButtonAction.bind(this) },
              flow[currentSlug].buttonText ? flow[currentSlug].buttonText : 'Continue'
            )
          )
        )
      );
    }
  }]);

  return _ComponentFlow;
}(_react2.default.Component), _class.propTypes = {
  flow: _react2.default.PropTypes.object.isRequired,
  currentSlug: _react2.default.PropTypes.string
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
  return {
    currentSlug: state.componentFlow.currentSlug,
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