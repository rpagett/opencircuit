'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var componentFlow = function componentFlow() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? { currentSlug: 'root' } : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'COMPONENTFLOW_SET_VIEW':
      return _extends({}, state, {
        currentSlug: action.slug
      });

    default:
      return state;
  }
};

exports.default = componentFlow;