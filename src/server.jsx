var express = require('express');
let app = express();

// Frameworks and Dependencies
import React from 'react';
import DotEnv from 'dotenv';
import { createStore, applyMiddleware, compose } from 'redux';
import universalMiddleware from 'redux-universal';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import flash from 'connect-flash';
import session from 'express-session';
import bodyParser from 'body-parser';
import Mongoose from 'mongoose';
import Passport from 'passport';
import LocalStrategy from 'passport-local';
const MongoStore = require('connect-mongo')(session);
const notifier = require('node-notifier');

// Client Routing
import { createRoutes, match, RouterContext } from 'react-router';
import { getAppRoutes } from './routes';

// Models and Repos
import User from './models/User/UserModel';
import { appReducers } from './redux';
import { loginUser, logoutUser } from './models/Auth/AuthActions';

// API Endpoints
import AuthController from './models/Auth/AuthController';
import APIDispatch from './APIDispatch';

app.use(express.static('dist'));

DotEnv.load();

Mongoose.connect('mongodb://localhost/opencircuit');
Mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'asdlfkj243@#R@#POFSDfic',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: Mongoose.connection
  })
}));
app.use(flash());

Passport.use(User.createStrategy());

Passport.serializeUser(function(user, done) {
  console.log('SERIALIZING');
  done(null, user.id);
});

Passport.deserializeUser((user_id, done) => {
  console.log('DESERIALIZING! ID is ', user_id);
  User.findOne({ _id: user_id }, '-password -hash -salt -createdAt -updatedAt', (err, user) => {
    if (err) { return done(err); }
    done(null, user);
  });
});

app.use(Passport.initialize());
app.use(Passport.session());

const appStore = createStore(appReducers,
  compose(universalMiddleware(thunk),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ?
      window.devToolsExtension() : f => f
  ));
//console.log('APP STORE IS', appStore.getState(), '-----------');

app.use((req, res, next) => {
  res.store = appStore;
  //console.log('RES STORE IS', res.store.getState(), '-----------');
  next();
});

function renderHTML(routerComponent, preloadedState) {
  console.log('In render function');
  return `<!DOCTYPE html>
        <html>
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>OpenCircuit</title>
          <link rel="stylesheet" href="/css/app.min.css" />
          <link rel="shortcut icon" href="/assets/img/favicon.ico" />
        </head>
        <body>
          <div className="container-fluid" id="react-container">
            <div>${routerComponent}</div>
          </div>
          <script id="injected-state">
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)}
          </script>
          <script type="text/javascript" src="/js/vendor.js"></script>
          <script type="text/javascript" src="/js/bundle.js"></script>
          <script>
            $(document).ready(function()
            {
                function reset_dimensions()
                {
                    doc_height = $(document).height();
                    $('.content-container').css('min-height', doc_height + 'px');
                }

                reset_dimensions();
                $(window).resize(function() {
                    reset_dimensions();
                });
                $(document).resize(function () {
                    reset_dimensions();
                });
            });
          </script>
        </body>
        </html>`;
}

function dispatchReactRoute(req, res, appRoutes) {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes: appRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      appStore.renderUniversal(renderToString, (
        <Provider store={ appStore }>
          <RouterContext { ...renderProps } />
        </Provider>
      ))
        .then(({ output }) => {
          const state = appStore.getState();
          res.status(200).send(renderHTML(output, state));
        })
        .catch(({ output, error }) => {
          const state = appStore.getState();
          res.status(200).send(renderHTML(output, state));
        });
    }
    else {
      res.redirect('/404');
    }
  });
}

app.use('/api', APIDispatch);
app.use('/auth', AuthController);

app.get('*', (req, res) => {
  console.log(req.session);
  console.log('REQ USER is', req.user);
  if (req.user) {
    appStore.dispatch(loginUser(req.user));
  }
  else {
    appStore.dispatch(logoutUser());
  }
  dispatchReactRoute(req, res, getAppRoutes(res.store));
});

app.listen(process.env.SERVER_PORT || 8080, function () {
  console.log('OpenCircuit is live on port', process.env.SERVER_PORT || 8080);

  notifier.notify({
    'title': 'OpenCircuit',
    'message': 'Local server is running with a new build.',
    'icon': './dist/assets/img/favicon.ico',
    'sound': 'Glass',
  });
});
