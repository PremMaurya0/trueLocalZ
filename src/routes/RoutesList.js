import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/login/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Tracking from '../pages/dashboard/Tracking'

import AddArea from '../pages/area/Addarea'
import AreaList from '../pages/area/list'

import AddBike from '../pages/bike/Addbike'
import ListVehicle from '../pages/bike/VehicleList'
import EditVehicle from '../pages/bike/EditVehicle'

import AddDriver from '../pages/driver/AddDriver'
import DriverList from '../pages/driver/DriverList'
import EditDriver from '../pages/driver/EditDriver'

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// handle the all routes
class RoutesList extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/tracking" component={Tracking} />
          <PrivateRoute exact path="/area/create-area" component={AddArea} />
          <PrivateRoute exact path="/area/area-list" component={AreaList} />
          <PrivateRoute exact path="/vehicle/vehicle-add" component={AddBike} />
          <PrivateRoute exact path="/vehicle/vehicle-list" component={ListVehicle} />
          <PrivateRoute exact path="/vehicle/list/edit/:id" component={EditVehicle} />
          <PrivateRoute exact path="/driver/driver-add" component={AddDriver} />
          <PrivateRoute exact path="/driver/driver-list" component={DriverList} />
          <PrivateRoute exact path="/driver/list/edit/:id" component={EditDriver} />
       
        </Switch>
      </BrowserRouter>
    )
  }
}

export default RoutesList;