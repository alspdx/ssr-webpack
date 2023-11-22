import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Home from './Home';
import { Page } from './Page';
import Container from './Container';
import WithModule from './WithModule';

const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
    <Route path="with-module" component={WithModule} />
  </Route>
);

export default routes;
