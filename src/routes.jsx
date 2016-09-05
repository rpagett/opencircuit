import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './app';
import AppTemplate from './templates/AppTemplate';
import AuthTemplate from './templates/AuthTemplate';

import * as RootView from './models/Dashboard/DashboardViews';
import * as AuthView from './models/Auth/AuthViews';
import * as CompClassView from './models/CompClass/CompClassViews';
import * as EventView from './models/Event/EventViews';
import * as RegistrationView from './models/Registration/RegistrationViews'
import * as UnitView from './models/Unit/UnitViews';
import * as UnitTypeView from './models/UnitType/UnitTypeViews'
import * as UserView from './models/User/UserViews';

import { UserRoles } from './models/User/UserRoles';
import { dumpContents as dumpFlexTable } from './helpers/FlexTable/FlexTableActions';
import { dumpContents as dumpContentsView } from './helpers/ContentsView/ContentsViewActions';

export function getAppRoutes(store) {
  const dumpContents = () => {
    dumpFlexTable();
    dumpContentsView();
  }

  function authOnly(nextState, replace) {
    const authUser = store.getState().auth.user;

    dumpContents();

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

        <Route path="/compclasses" onEnter={ requiresRole.bind(this, UserRoles.Administrator) }>
          <IndexRoute component={ CompClassView.Index } />
          <Route path="new" component={ CompClassView.New } />
          <Route path=":abbreviation" component={ CompClassView.Show } />
          <Route path=":abbreviation/edit" component={ CompClassView.Edit } />
        </Route>

        <Route path="/events">
          <IndexRoute component={ EventView.Index } />
          <Route path="new" component={ EventView.New } onEnter={ requiresRole.bind(this, UserRoles.EventDirector) } />
          <Route path=":slug" component={ EventView.Show } />
          <Route path=":slug/edit" component={ EventView.Edit } onEnter={ requiresRole.bind(this, UserRoles.EventDirector) } />
        </Route>

        <Route path="/register">
          <IndexRoute component={ RegistrationView.Organization } />
          <Route path="organization/:org" component={ RegistrationView.Unit } />
          <Route path="unit/:unit" component={ RegistrationView.Details } />
          <Route path="unit/:unit/events" component={ RegistrationView.EventRegistration } />
          <Route path="unit/:unit/confirm" component={ RegistrationView.Confirm } />
        </Route>

        <Route path="/units">
          <IndexRoute component={ UnitView.Index } onEnter={ requiresRole.bind(this, UserRoles.EventDirector) } />
        </Route>

        <Route path="/unittypes" onEnter={ requiresRole.bind(this, UserRoles.Administrator) }>
          <IndexRoute component={ UnitTypeView.Index } />
          <Route path=":slug" component={ UnitTypeView.Show } />
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
