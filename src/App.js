import React, { Component } from 'react';
import './scss/style.scss';
import './App.css';
import Login from './views/Login';
import Calendar from './views/Calendar';
import UserManagement from './views/UserManagement';
import Logout from './views/Logout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" component={Login} />
              <Route exact path="/calendar" name="Calendar Page" component={Calendar} />
              <Route exact path="/userManagement" name="UserManagement Page" component={UserManagement} />
              <Route exact path="/logout" name="Logout Page" component={Logout} />
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    );
  }
}

export default App;