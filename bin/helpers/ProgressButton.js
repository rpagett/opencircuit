'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var STATE = exports.STATE = {
  LOADING: 'loading',
  DISABLED: 'disabled',
  SUCCESS: 'success',
  ERROR: 'error',
  NOTHING: ''
};

var ProgressButton = _react2.default.createClass({
  displayName: 'ProgressButton',

  propTypes: {
    classNamespace: _react2.default.PropTypes.string,
    durationError: _react2.default.PropTypes.number,
    durationSuccess: _react2.default.PropTypes.number,
    form: _react2.default.PropTypes.string,
    onClick: _react2.default.PropTypes.func,
    onError: _react2.default.PropTypes.func,
    onSuccess: _react2.default.PropTypes.func,
    state: _react2.default.PropTypes.oneOf(Object.keys(STATE).map(function (k) {
      return STATE[k];
    })),
    type: _react2.default.PropTypes.string,
    shouldAllowClickOnLoading: _react2.default.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classNamespace: 'pb-',
      durationError: 1200,
      durationSuccess: 500,
      onClick: function onClick() {},
      onError: function onError() {},
      onSuccess: function onSuccess() {},

      shouldAllowClickOnLoading: false
    };
  },
  getInitialState: function getInitialState() {
    return {
      currentState: this.props.state || STATE.NOTHING
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.state === this.props.state) {
      return;
    }
    switch (nextProps.state) {
      case STATE.SUCCESS:
        this.success();
        return;
      case STATE.ERROR:
        this.error();
        return;
      case STATE.LOADING:
        this.loading();
        return;
      case STATE.DISABLED:
        this.disable();
        return;
      case STATE.NOTHING:
        this.notLoading();
        return;
      default:
        return;
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this._timeout);
  },
  render: function render() {
    var _props = this.props,
        className = _props.className,
        classNamespace = _props.classNamespace,
        children = _props.children,
        type = _props.type,
        form = _props.form,
        durationError = _props.durationError,
        durationSuccess = _props.durationSuccess,
        onClick = _props.onClick,
        onError = _props.onError,
        state = _props.state,
        shouldAllowClickOnLoading = _props.shouldAllowClickOnLoading,
        containerProps = _objectWithoutProperties(_props, ['className', 'classNamespace', 'children', 'type', 'form', 'durationError', 'durationSuccess', 'onClick', 'onError', 'state', 'shouldAllowClickOnLoading']);

    containerProps.className = classNamespace + 'container ' + this.state.currentState + ' ' + className;
    containerProps.onClick = this.handleClick;
    return _react2.default.createElement(
      'div',
      containerProps,
      _react2.default.createElement(
        'button',
        { type: type, form: form, className: classNamespace + 'button' },
        _react2.default.createElement(
          'span',
          null,
          children
        ),
        _react2.default.createElement(
          'svg',
          { className: classNamespace + 'progress-circle', viewBox: '0 0 41 41' },
          _react2.default.createElement('path', { d: 'M38,20.5 C38,30.1685093 30.1685093,38 20.5,38' })
        ),
        _react2.default.createElement(
          'svg',
          { className: classNamespace + 'checkmark', viewBox: '0 0 70 70' },
          _react2.default.createElement('path', { d: 'm31.5,46.5l15.3,-23.2' }),
          _react2.default.createElement('path', { d: 'm31.5,46.5l-8.5,-7.1' })
        ),
        _react2.default.createElement(
          'svg',
          { className: classNamespace + 'cross', viewBox: '0 0 70 70' },
          _react2.default.createElement('path', { d: 'm35,35l-9.3,-9.3' }),
          _react2.default.createElement('path', { d: 'm35,35l9.3,9.3' }),
          _react2.default.createElement('path', { d: 'm35,35l-9.3,9.3' }),
          _react2.default.createElement('path', { d: 'm35,35l9.3,-9.3' })
        )
      )
    );
  },
  handleClick: function handleClick(e) {
    if ((this.props.shouldAllowClickOnLoading || this.state.currentState !== 'loading') && this.state.currentState !== 'disabled' && this.state.currentState !== 'error') {
      var ret = this.props.onClick(e);
      this.loading(ret);
    } else {
      e.preventDefault();
    }
  },
  loading: function loading(promise) {
    var _this = this;

    this.setState({ currentState: 'loading' });
    if (promise && promise.then && promise.catch) {
      promise.then(function () {
        _this.success();
      }).catch(function () {
        _this.error();
      });
    }
  },
  notLoading: function notLoading() {
    this.setState({ currentState: STATE.NOTHING });
  },
  enable: function enable() {
    this.setState({ currentState: STATE.NOTHING });
  },
  disable: function disable() {
    this.setState({ currentState: STATE.DISABLED });
  },
  success: function success(callback, dontRemove) {
    this.setState({ currentState: STATE.SUCCESS });
  },
  error: function error(callback) {
    this.setState({ currentState: STATE.ERROR });
  }
});

exports.default = ProgressButton;