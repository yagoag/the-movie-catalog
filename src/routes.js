import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Search from './pages/Search';
import Movie from './pages/Movie';
import NotFound from './pages/NotFound';

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route path="/movie/:id" component={Movie} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
