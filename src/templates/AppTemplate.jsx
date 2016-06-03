import React from 'react';

export default class AppTemplate extends React.Component {
  render() {
    return (
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
          { this.props.children }
        </div>

        <script type="text/javascript" src="/js/vendor.js" />
        <script type="text/javascript" src="/js/bundle.js" />
        <script type="text/javascript" src="/js/bootstrap.js" />

      </body>
      </html>
    );
  }
};