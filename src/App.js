import React from 'react';
import RoutesList from './routes/RoutesList';
import * as GlobalProvider from './providers/globals/globals';
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.isLoggedIn();
  }

  isLoggedIn() {

    let token = GlobalProvider.getUser();
    console.log('##################### token:', token);
    if (!token) {
      GlobalProvider.clearStorage();
    }
  }

  render() {
    return (
      <RoutesList />
    );
  }
}

export default App;