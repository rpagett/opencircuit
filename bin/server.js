'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _redux = require('redux');

var _reduxUniversal = require('redux-universal');

var _reduxUniversal2 = _interopRequireDefault(_reduxUniversal);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reactRedux = require('react-redux');

var _server = require('react-dom/server');

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _UserModel = require('./models/User/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

var _redux2 = require('./redux');

var _AuthActions = require('./models/Auth/AuthActions');

var _AuthController = require('./models/Auth/AuthController');

var _AuthController2 = _interopRequireDefault(_AuthController);

var _APIDispatch = require('./APIDispatch');

var _APIDispatch2 = _interopRequireDefault(_APIDispatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();

// Frameworks and Dependencies

var MongoStore = require('connect-mongo')(_expressSession2.default);
var notifier = require('node-notifier');

// Client Routing


// Models and Repos


// API Endpoints


app.use(express.static('dist'));

_dotenv2.default.load();

_mongoose2.default.connect('mongodb://localhost/opencircuit');
_mongoose2.default.Promise = global.Promise;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressSession2.default)({
  secret: 'asdlfkj243@#R@#POFSDfic',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: _mongoose2.default.connection
  })
}));
app.use((0, _connectFlash2.default)());

_passport2.default.use(_UserModel2.default.createStrategy());

_passport2.default.serializeUser(function (user, done) {
  console.log('SERIALIZING');
  done(null, user.id);
});

_passport2.default.deserializeUser(function (user_id, done) {
  console.log('DESERIALIZING! ID is ', user_id);
  _UserModel2.default.findOne({ _id: user_id }, '-password -hash -salt -createdAt -updatedAt', function (err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

var appStore = (0, _redux.createStore)(_redux2.appReducers, (0, _redux.compose)((0, _reduxUniversal2.default)(_reduxThunk2.default), (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : function (f) {
  return f;
}));
//console.log('APP STORE IS', appStore.getState(), '-----------');

app.use(function (req, res, next) {
  res.store = appStore;
  //console.log('RES STORE IS', res.store.getState(), '-----------');
  next();
});

function renderHTML(routerComponent, preloadedState) {
  console.log('In render function');
  return '<!DOCTYPE html>\n        <html>\n        <head>\n          <meta charSet="UTF-8" />\n          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n          <title>OpenCircuit</title>\n          <link rel="stylesheet" href="/css/app.min.css" />\n          <link rel="shortcut icon" href="/assets/img/favicon.ico" />\n        </head>\n        <body>\n          <div className="container-fluid" id="react-container">\n            <div>' + routerComponent + '</div>\n          </div>\n          <script id="injected-state">\n            window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState) + '\n          </script>\n          <script type="text/javascript" src="/js/vendor.js"></script>\n          <script type="text/javascript" src="/js/bundle.js"></script>\n          <script>\n            //$(document).ready(function()\n            //{\n            //    function reset_dimensions()\n            //    {\n            //        doc_height = $(document).height();\n            //        $(\'.content-container\').css(\'height\', doc_height + \'px\');\n            //    }\n            //\n            //    reset_dimensions();\n            //    $(window).resize(function() {\n            //        reset_dimensions();\n            //    });\n            //    $(document).resize(function () {\n            //        reset_dimensions();\n            //    });\n            //\n            //    window.addEventListener(\'popstate\', reset_dimensions);\n            //});\n          </script>\n        </body>\n        </html>';
}

function dispatchReactRoute(req, res, appRoutes) {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  (0, _reactRouter.match)({ routes: appRoutes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      appStore.renderUniversal(_server.renderToString, _react2.default.createElement(
        _reactRedux.Provider,
        { store: appStore },
        _react2.default.createElement(_reactRouter.RouterContext, renderProps)
      )).then(function (_ref) {
        var output = _ref.output;

        var state = appStore.getState();
        res.status(200).send(renderHTML(output, state));
      }).catch(function (_ref2) {
        var output = _ref2.output,
            error = _ref2.error;

        var state = appStore.getState();
        res.status(200).send(renderHTML(output, state));
      });
    } else {
      res.redirect('/404');
    }
  });
}

app.use('/api', _APIDispatch2.default);
app.use('/auth', _AuthController2.default);

app.get('*', function (req, res) {
  if (req.user) {
    appStore.dispatch((0, _AuthActions.loginUser)(req.user));
  } else {
    appStore.dispatch((0, _AuthActions.logoutUser)());
  }
  dispatchReactRoute(req, res, (0, _routes.getAppRoutes)(res.store));
});

app.listen(process.env.SERVER_PORT || 8080, function () {
  console.log('OpenCircuit is live on port', process.env.SERVER_PORT || 8080);

  notifier.notify({
    'title': 'OpenCircuit',
    'message': 'Local server is running with a new build.',
    'icon': './dist/assets/img/favicon.ico',
    'sound': 'Glass'
  });
});