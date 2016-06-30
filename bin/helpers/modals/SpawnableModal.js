'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _class, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOverlays = require('react-overlays');

var _reactRedux = require('react-redux');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _LoadingCube = require('../LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _ModalActions = require('./ModalActions');

var ModalActions = _interopRequireWildcard(_ModalActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SpawnableModalTransition = function (_React$Component) {
  _inherits(_SpawnableModalTransition, _React$Component);

  function _SpawnableModalTransition() {
    _classCallCheck(this, _SpawnableModalTransition);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_SpawnableModalTransition).apply(this, arguments));
  }

  _createClass(_SpawnableModalTransition, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactOverlays.Transition, _extends({
        timeout: 200,
        backdropTransitionTimeout: 200,
        className: 'spawnable-modal-fade',
        enteringClassName: 'spawnable-modal-in',
        enteredClassName: 'spawnable-modal-in'
      }, this.props));
    }
  }]);

  return _SpawnableModalTransition;
}(_react2.default.Component);

var _SpawnableModal = (_temp = _class = function (_React$Component2) {
  _inherits(_SpawnableModal, _React$Component2);

  function _SpawnableModal() {
    _classCallCheck(this, _SpawnableModal);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_SpawnableModal).apply(this, arguments));
  }

  _createClass(_SpawnableModal, [{
    key: 'fetchModalBody',
    value: function fetchModalBody() {
      return _react2.default.createElement(_LoadingCube2.default, { show: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var modalStyle = {
        position: 'fixed',
        zIndex: 1040,
        top: 0, bottom: 0, left: 0, right: 0
      };

      var backdropStyle = _extends({}, modalStyle, {
        //zIndex: 'auto',
        backgroundColor: '#000',
        opacity: 0.5
      });

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactOverlays.Modal,
          {
            'aria-labelledby': 'modal-label'
            //backdropClassName="spawnable-modal-backdrop"
            , backdropStyle: backdropStyle,
            show: this.props.isOpen,
            onHide: this.props.markClosed,
            transition: _SpawnableModalTransition
          },
          _react2.default.createElement(
            'div',
            { className: 'container spawnable-modal' },
            this.props.allowClose ? _react2.default.createElement(
              'span',
              { className: 'pull-right close' },
              _react2.default.createElement(_Icon2.default, { shape: 'close' })
            ) : '',
            _react2.default.createElement(
              'div',
              { className: 'row' },
              this.props.title ? _react2.default.createElement(
                'h4',
                { id: 'modal-label' },
                this.props.title
              ) : ''
            ),
            _react2.default.createElement('hr', null),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              this.fetchModalBody()
            )
          )
        )
      );
    }
  }]);

  return _SpawnableModal;
}(_react2.default.Component), _class.defaultProps = {
  isOpen: false,
  title: 'This is a modal.'
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isOpen: state.modal.isOpen,
    allowClose: state.modal.allowClose,
    title: state.modal.title
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    markClosed: function markClosed() {
      dispatch(ModalActions.close());
    }
  };
};

var SpawnableModal = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_SpawnableModal);
exports.default = SpawnableModal;