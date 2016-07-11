'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var modelView = function modelView() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'MODELVIEW_BEGIN_LOADING':
      return _extends({}, state, {
        isLoading: true
      });

    case 'MODELVIEW_RECEIVED_MODEL':
      return {
        model: action.model,
        isLoading: false
      };

    case 'MODELVIEW_ERROR':
      return _extends({}, state, {
        isLoading: false,
        error: action.error
      });

    default:
      return state;
  }
};

exports.default = modelView;