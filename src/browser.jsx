import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import { AppRouter } from './routes';
import { appReducers } from './redux';

// Bootstrap for Browserify
global.$ = require('jquery');
global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

const preloadedState = window.__PRELOADED_STATE__
const appStore = createStore(appReducers, preloadedState,
  compose(applyMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  ));

ReactDOM.render(
  <Provider store={ appStore }>
    <AppRouter reduxStore={ appStore } />
  </Provider>,
  document.getElementById('react-container')
);

document.getElementById('injected-state').innerHTML = '';