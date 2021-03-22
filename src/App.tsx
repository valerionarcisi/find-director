import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { PersonContainer } from './containers/PersonContainer'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        <Route exact path="/search" component={() => <PersonContainer />} />
      </Switch>
    </Router>
  );
}

export default App