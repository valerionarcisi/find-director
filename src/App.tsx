import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { DirectorContainer } from './containers/DirectorContainer';
import { SearchContainer } from './containers/SearchContainer'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        <Route exact path="/search" component={SearchContainer} />
        <Route exact path="/person/:id" component={DirectorContainer} />
      </Switch>
    </Router>
  );
}

export default App