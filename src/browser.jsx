import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { AppRouter } from './routing/routes';
import { appReducers } from './redux';
import { expandUser } from './actions/AuthActions';

// Bootstrap for Browserify
global.jQuery = require('jquery');
global.Tether = require('tether');
require('bootstrap');

const preloadedState = window.__PRELOADED_STATE__
const appStore = createStore(appReducers, preloadedState)

//appStore.dispatch(expandUser(appStore.getState().auth.token));

ReactDOM.render(
  <Provider store={ appStore }>
    <AppRouter />
  </Provider>,
  document.getElementById('react-container')
);