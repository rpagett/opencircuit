import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import AppTemplate from './templates/AppTemplate';
import * as RootView from './models/Dashboard/DashboardViews';

import AuthTemplate from './templates/AuthTemplate';
import * as AuthView from './models/Auth/AuthViews';

import * as UserView from './models/User/UserViews';

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
        <IndexRoute component={ RootView.Home } />

        <Route path="/users">
          <IndexRoute component={ UserView.Index } />
          <Route path=":email" component={ UserView.Show } />
        </Route>
      </Route>

      <Route path="/auth" component={ AuthTemplate } onEnter={ guestOnly }>
        <Route path="login" component={ AuthView.Login } />
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
