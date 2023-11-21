import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Home from './Home';
import { Page } from './Page';  
 
const routes = (
  <Route path="/">
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
  </Route>
);

export default routes;