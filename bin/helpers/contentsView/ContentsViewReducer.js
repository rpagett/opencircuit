'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var contentsView = function contentsView() {
  var _extends3;

  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {
    case 'CONTENTSVIEW_BEGIN_LOADING':
      return _extends({}, state, {
        isLoading: true
      });

    case 'CONTENTSVIEW_DUMP_CONTENTS':
      if (action.subStore) {
        var _extends2;

        return _extends({}, state, (_extends2 = {}, _defineProperty(_extends2, action.subStore, null), _defineProperty(_extends2, 'isLoading', true), _extends2));
      } else {
        return {
          isLoading: true
        };
      }

    case 'CONTENTSVIEW_RECEIVED_CONTENTS':
      return _extends({}, state, (_extends3 = {}, _defineProperty(_extends3, action.subStore, action.contents), _defineProperty(_extends3, 'isLoading', false), _extends3));

    case 'CONTENTSVIEW_ERROR':
      return _extends({}, state, {
        isLoading: false,
        error: action.error
      });

    default:
      return state;
  }
};

exports.default = contentsView;