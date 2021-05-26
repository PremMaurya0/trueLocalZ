import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/login/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Addbike from '../pages/bike/Addbike'


import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// handle the all routes
class RoutesList extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/create-bike" component={Addbike} />

       
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RoutesList;