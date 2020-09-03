import React, { Component } from 'react';
import './App.css';
import Login from './views/Login';
import Calendar from './views/Calendar';
import UserManagement from './views/UserManagement';
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
            </Switch>
          </React.Suspense>
        </Router>
      </div>
    );
  }
}

export default App;