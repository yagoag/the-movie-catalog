import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import Movie from './pages/Movie';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/movie/:id" component={Movie} />
    </Switch>
  </Router>
);

export default Routes;
