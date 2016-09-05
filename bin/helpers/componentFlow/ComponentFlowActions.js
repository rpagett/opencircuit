'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setView = setView;

var _reactRouter = require('react-router');

//function setSlug(slug) {
//  return {
//    type: 'COMPONENTFLOW_SET_VIEW',
//    slug
//  }
//}

function setView(slug) {
  return function (dispatch) {
    _reactRouter.browserHistory.push('/units/register/' + slug);
  };
}