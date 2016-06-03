var express = require('express');
let app = express();

import React from 'react';
import { renderToString } from 'react-dom/server';
import flash from 'connect-flash';
import session from 'express-session';

import { createRoutes, match, RouterContext } from 'react-router';
import { AppRoutes } from './routing/routes';

app.use(express.static('dist'));

app.use(session({
  genid: function(req) {
    return require('crypto').randomBytes(48).toString('hex');
  },
  secret: 'asdlfkj243@#R@#POFSDfic',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

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
      const routerComponent = renderToString(<RouterContext { ...renderProps } />);
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
          <div>${routerComponent}</div></div>
          <script type="text/javascript" src="/js/vendor.js"></script>
          <script type="text/javascript" src="/js/bundle.js"></script>
          <script type="text/javascript" src="/js/bootstrap.js"></script>
        </body>
        </html>`;

      res.status(200).send(HTML);
    }
    else {
      res.status(404).send('Not found')
    }
  });
}

app.get('*', (req, res) => {
  dispatchReactRoute(req, res, AppRoutes);
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
