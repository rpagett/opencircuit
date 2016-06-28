'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialState = {
  loading: {},
  globalErrors: {}
};

var form = function form() {
  var _extends2;

  var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case 'FORM_RECEIVED_DATA':
      return _extends({}, state, (_extends2 = {}, _defineProperty(_extends2, action.subStore, action.model), _defineProperty(_extends2, action.subStore + '_errors', {}), _extends2));

    case 'FORM_UPDATE_FIELD_VALUE':
      return _extends({}, state, _defineProperty({}, action.subStore, _extends({}, state[action.subStore], _defineProperty({}, action.field, action.value))));

    case 'FORM_BEGIN_LOADING':
      return _extends({}, state, {
        loading: _extends({}, state.loading, _defineProperty({}, action.subStore, true))
      });

    case 'FORM_STOP_LOADING':
      return _extends({}, state, {
        loading: _extends({}, state.loading, _defineProperty({}, action.subStore, false))
      });

    case 'FORM_GLOBAL_ERROR':
      return _extends({}, state, {
        globalErrors: _extends({}, state.globalErrors, _defineProperty({}, action.subStore, action.error.toString()))
      });

    case 'FORM_CLEAR_ERRORS':
      return _extends({}, state, _defineProperty({}, action.subStore + '_errors', {}));

    case 'FORM_SUBMISSION_ERRORS':
      console.log('Applying errors', action.errors);
      return _extends({}, state, _defineProperty({}, action.subStore + '_errors', _extends({}, action.errors)));

    default:
      return state;
  }
};

exports.default = form;