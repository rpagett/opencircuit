var express = require('express');
let app = express();

// Frameworks and Dependencies
import React from 'react';
import { createStore } from 'redux';
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
import { AppRoutes } from './routing/routes';

// Models and Repos
import { appReducers } from './redux';
import { loginUser } from './actions/AuthActions';
import User from './models/UserModel';

// API Endpoints
import AuthController from './controllers/AuthController';
import APIDispatch from './controllers/APIDispatch';

app.use(express.static('dist'));

Mongoose.connect('mongodb://localhost/opencircuit');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'asdlfkj243@#R@#POFSDfic',
  resave: true,
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
  User.findById(user_id, (err, user) => {
    if (err) { return done(err); }
    done(null, user);
  });
});

app.use(Passport.initialize());
app.use(Passport.session());

const appStore = createStore(appReducers);

function dispatchReactRoute(req, res) {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ routes: AppRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    }
    else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    }
    else if (renderProps) {
      const routerComponent = renderToString(
        <Provider store={ appStore }>
          <RouterContext { ...renderProps } />
        </Provider>
      );
      const preloadedState = appStore.getState();
      const HTML = `<html>
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
        </body>
        </html>`;

      res.status(200).send(HTML);
    }
    else {
      res.status(404).send('Not found')
    }
  });
}

app.get('/maketheuser', (req, res) => {
  User.register(new User({email: 'riley@opencircuit.us'}), 'estiondf', function(err) {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
});

app.use('/api', APIDispatch);
app.use('/auth', AuthController);

app.get('*', (req, res) => {
  console.log(req.session);
  if (req.user) {
    appStore.dispatch(loginUser(req.user));
  }
  dispatchReactRoute(req, res, AppRoutes);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');

  notifier.notify({
    'title': 'OpenCircuit',
    'message': 'Server is running with a new build.',
    'icon': './dist/assets/img/favicon.ico',
    'sound': 'Glass',
  });
});
