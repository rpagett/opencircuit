'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _reactRouter = require('react-router');

var _routes = require('./routing/routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = express();

app.use(express.static('dist'));

app.use((0, _expressSession2.default)({
  genid: function genid(req) {
    return require('crypto').randomBytes(48).toString('hex');
  },
  secret: 'asdlfkj243@#R@#POFSDfic',
  resave: false,
  saveUninitialized: false
}));
app.use((0, _connectFlash2.default)());

function dispatchReactRoute(req, res) {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  (0, _reactRouter.match)({ routes: _routes.AppRoutes, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var routerComponent = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps));
      var HTML = '<html>\n        <head>\n          <meta charSet="UTF-8" />\n          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />\n          <title>OpenCircuit</title>\n          <link rel="stylesheet" href="/css/app.min.css" />\n          <link rel="shortcut icon" href="/assets/img/favicon.ico" />\n        </head>\n        <body>\n          <div className="container-fluid" id="react-container">\n          <div>' + routerComponent + '</div></div>\n          <script type="text/javascript" src="/js/vendor.js"></script>\n          <script type="text/javascript" src="/js/bundle.js"></script>\n          <script type="text/javascript" src="/js/bootstrap.js"></script>\n        </body>\n        </html>';

      res.status(200).send(HTML);
    } else {
      res.status(404).send('Not found');
    }
  });
}

app.get('*', function (req, res) {
  dispatchReactRoute(req, res, _routes.AppRoutes);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});