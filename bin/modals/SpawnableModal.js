'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LaunchModalButton = undefined;

var _class, _temp, _class2, _temp2;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOverlays = require('react-overlays');

var _reactRedux = require('react-redux');

var _Icon = require('../helpers/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _LoadingCube = require('../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _ModalActions = require('./ModalActions');

var ModalActions = _interopRequireWildcard(_ModalActions);

var _FeeModals = require('../models/Fee/FeeModals');

var FeeModals = _interopRequireWildcard(_FeeModals);

var _FlexTableModals = require('../helpers/FlexTable/FlexTableModals');

var FlexTableModals = _interopRequireWildcard(_FlexTableModals);

var _UserModals = require('../models/User/UserModals');

var UserModals = _interopRequireWildcard(_UserModals);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpawnableModalTransition = function (_React$Component) {
  _inherits(SpawnableModalTransition, _React$Component);

  function SpawnableModalTransition() {
    _classCallCheck(this, SpawnableModalTransition);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SpawnableModalTransition).apply(this, arguments));
  }

  _createClass(SpawnableModalTransition, [{
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

  return SpawnableModalTransition;
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
      var modalProps = _extends({}, this.props.modalProps, {
        markClosed: this.props.markClosed
      });
      switch (this.props.componentName) {

        case 'USER_ROLES':
          return _react2.default.createElement(UserModals.ManageRoles, modalProps);

        case 'FEE_APPLY_PAYMENT':
          return _react2.default.createElement(FeeModals.AdminPayment, modalProps);

        case 'FEE_ASSESS_FEE':
          return _react2.default.createElement(FeeModals.AssessFee, modalProps);

        case 'FEE_GENERATE_INVOICE':
          return _react2.default.createElement(FeeModals.GenerateInvoice, modalProps);

        case 'FEE_USER_PAY':
          return _react2.default.createElement(FeeModals.UserPayment, modalProps);

        case 'FEE_PAYMENTS':
          return _react2.default.createElement(FeeModals.Payments, modalProps);

        case 'FLEXTABLE_CONFIRM_DELETION':
          return _react2.default.createElement(FlexTableModals.ConfirmDeletion, modalProps);

        default:
          return _react2.default.createElement(_LoadingCube2.default, { show: true });
      }
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
            transition: SpawnableModalTransition
          },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid spawnable-modal' },
            this.props.allowClose ? _react2.default.createElement(
              'span',
              { className: 'pull-xs-right close', onClick: this.props.markClosed },
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
            this.fetchModalBody()
          )
        )
      );
    }
  }]);

  return _SpawnableModal;
}(_react2.default.Component), _class.defaultProps = {
  isOpen: false
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
  return {
    allowClose: state.modal.allowClose,
    componentName: state.modal.component,
    isOpen: state.modal.isOpen,
    modalProps: state.modal.props,
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

var _LaunchModalButton = (_temp2 = _class2 = function (_React$Component3) {
  _inherits(_LaunchModalButton, _React$Component3);

  function _LaunchModalButton() {
    _classCallCheck(this, _LaunchModalButton);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_LaunchModalButton).apply(this, arguments));
  }

  _createClass(_LaunchModalButton, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        _extends({ className: this.props.className }, this.props.buttonProps, { onClick: this.props.launch.bind(this) }),
        this.props.buttonText
      );
    }
  }]);

  return _LaunchModalButton;
}(_react2.default.Component), _class2.propTypes = {
  buttonProps: _react2.default.PropTypes.object,

  title: _react2.default.PropTypes.string.isRequired,
  componentName: _react2.default.PropTypes.string.isRequired,
  modalProps: _react2.default.PropTypes.object
}, _temp2);

var mapDispatchToButtonProps = function mapDispatchToButtonProps(dispatch, props) {
  return {
    launch: function launch() {
      dispatch(ModalActions.launch(props.title, props.componentName, props.modalProps));
    }
  };
};

var LaunchModalButton = exports.LaunchModalButton = (0, _reactRedux.connect)(function (state) {
  return {};
}, mapDispatchToButtonProps)(_LaunchModalButton);