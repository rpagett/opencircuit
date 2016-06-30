'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.define = define;
exports.close = close;
exports.open = open;
function define(title, component) {
  return {
    type: 'MODAL_DEFINE',
    title: title,
    component: component
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