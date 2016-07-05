'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var initialState = {
  isOpen: false,
  allowClose: true
};

var modal = function modal() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case 'MODAL_OPEN':
      return _extends({}, state, {
        isOpen: true
      });

    case 'MODAL_CLOSE':
      return _extends({}, state, {
        isOpen: false
      });

    case 'MODAL_DEFINE':
      return _extends({}, state, {
        component: action.component,
        title: action.title,
        props: action.props
      });

    default:
      return state;
  }
};

exports.default = modal;