'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var flexTable = function flexTable() {
  var _extends2;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {

    case 'FLEXTABLE_RECEIVED_CONTENTS':
      return _extends({}, state, (_extends2 = {}, _defineProperty(_extends2, action.name, action.contents), _defineProperty(_extends2, 'isLoading', false), _extends2));

    case 'FLEXTABLE_DUMP_CONTENTS':
      if (action.name) {
        return _extends({}, state, _defineProperty({}, action.name, null));
      } else {
        return {
          isLoading: true
        };
      }

    case 'FLEXTABLE_ERROR':
      return _extends({}, state, {
        error: action.error,
        isLoading: false
      });

    case 'FLEXTABLE_BEGIN_LOADING':
      return _extends({}, state, {
        isLoading: true,
        lastName: action.tableName
      });

    case 'FLEXTABLE_STOP_LOADING':
      return _extends({}, state, {
        isLoading: false
      });

    default:
      return state;
  }
};

exports.default = flexTable;
module.exports = exports['default'];