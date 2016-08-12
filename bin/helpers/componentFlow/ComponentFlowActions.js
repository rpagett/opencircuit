'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setView = setView;
function setView(slug) {
  return {
    type: 'COMPONENTFLOW_SET_VIEW',
    slug: slug
  };
}