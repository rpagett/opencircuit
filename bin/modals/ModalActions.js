'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.launch = launch;
exports.close = close;
exports.open = open;
function launch(title, component) {
  var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  return function (dispatch) {
    dispatch(define(title, component, props));
    dispatch(open());
  };
}

function define(title, component) {
  var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  return {
    type: 'MODAL_DEFINE',
    title: title,
    component: component,
    props: props
  };
}

function close() {
  return {
    type: 'MODAL_CLOSE'
  };
}

function open() {
  return {
    type: 'MODAL_OPEN'
  };
}