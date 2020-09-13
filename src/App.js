import React, {Component} from 'react';
import './scss/style.scss';
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
              <Route exact path="/userManagement" name="UserManagement" component={UserManagement} />
              <Route exact path="/" name="UserManagement" component={UserManagement} />
            </Switch>
          </React.Suspense>
      </Router>
      </div>
    );
  }
}

export default App;
