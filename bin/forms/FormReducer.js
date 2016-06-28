'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var form = function form() {
  var _extends2;

  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  switch (action.type) {

    case 'FORM_RECEIVED_DATA':
      console.log('In reducer.');
      var newState = _extends({}, state, (_extends2 = {}, _defineProperty(_extends2, action.formStore, action.model), _defineProperty(_extends2, action.formStore + '_errors', {}), _extends2));
      console.log('NEW STATE', newState);
      return newState;

    case 'FORM_UPDATE_FIELD_VALUE':
      var updatedState = _extends({}, state, _defineProperty({}, action.formStore, _extends({}, state[action.formStore], _defineProperty({}, action.field, action.value))));
      console.log('UPDATED STATE', updatedState);
      return updatedState;

    default:
      return state;
  }
};

exports.default = form;