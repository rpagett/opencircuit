import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import AppTemplate from './templates/AppTemplate';
import AuthTemplate from './templates/AuthTemplate';

import * as RootView from './models/Dashboard/DashboardViews';
import * as AuthView from './models/Auth/AuthViews';
import * as EventView from './models/Event/EventViews';
import * as UserView from './models/User/UserViews';

import { UserRoles } from './models/User/UserRoles';

export function getAppRoutes(store) {
  function authOnly(nextState, replace) {
    const authUser = store.getState().auth.user;

    if (!authUser) {
      replace('/auth/login');
    }
  }

  function isUserOrAdmin(nextState, replace) {
    const authUser = store.getState().auth.user;
    const routeUser = nextState.params.email;

    if (!authUser) {
      replace('/');
    }

    if (routeUser != authUser.email && !authUser.roles.includes(UserRoles.Administrator)) {
      replace('/');
    }
  }

  function requiresRole(role = null, nextState, replace) {
    const authUser = store.getState().auth.user;

    if (!authUser) {
      replace('/');
    }

    if (role && !authUser.roles.includes(UserRoles.Administrator) && !authUser.roles.includes(role)) {
      replace('/');
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

        <Route path="/events">
          <IndexRoute component={ EventView.Index } />
          <Route path="new" component={ EventView.New } onEnter={ requiresRole.bind(this, UserRoles.EventDirector) } />
          <Route path=":slug" component={ EventView.Show } />
          <Route path=":slug/edit" component={ EventView.Edit } onEnter={ requiresRole.bind(this, UserRoles.EventDirector) } />
        </Route>

        <Route path="/users">
          <IndexRoute component={ UserView.Index } onEnter={ requiresRole.bind(this, UserRoles.Administrator) } />
          <Route path=":email" component={ UserView.Show } />
          <Route path=":email/edit" component={ UserView.Edit } onEnter={ isUserOrAdmin } />
        </Route>
      </Route>

      <Route path="/auth" component={ AuthTemplate } onEnter={ guestOnly }>
        <Route path="login" component={ AuthView.Login } />
        <Route path="register" component={ AuthView.Register } />
        <Route path="forgot" component={ AuthView.Forgot } />
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
