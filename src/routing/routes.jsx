import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../app';
import AppTemplate from '../templates/AppTemplate';
import * as RootView from '../views/RootViews';

import AuthTemplate from '../templates/AuthTemplate';
import * as AuthView from '../views/AuthViews';

export function getAppRoutes(store) {

  function authOnly(nextState, replace) {
    const authUser = store.getState().auth.user;

    if (!authUser) {
      replace('/auth/login');
    }
  }

  function guestOnly(nextState, replace) {
    const authUser = store.getState().auth.user;

    if (authUser) {
      replace('/');
    }
  }

  const AppRoutes = (
    <Route path="/" component={ AppTemplate }>

      <Route component={ App } onEnter={ authOnly }>
        <IndexRoute component={ RootView.Home }/>
        <Route path="about" component={ RootView.About }/>
      </Route>

      <Route path="/auth" component={ AuthTemplate }>
        <Route path="login" component={ AuthView.Login } onEnter={ guestOnly } />
        <Route path="register" component={ AuthView.Register }/>
      </Route>

    </Route>
  );

  return AppRoutes;
}

export class AppRouter extends React.Component {
  render() {
    return (
      <Router history={ browserHistory }>
        { getAppRoutes(this.props.reduxStore) }
      </Router>
    );
  }
};
