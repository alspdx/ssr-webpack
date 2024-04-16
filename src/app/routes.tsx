import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Container from './Container/Container';
import Home from './Home/Home';
import Page from './Page/Page';
import WithModule from './WithModule/WithModule';
import WithNestedRoute from './WithNestedRoute';
import Child from './WithNestedRouteChild';

const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
    <Route path="with-module" component={WithModule} />
    <Route path="nesting" component={WithNestedRoute}>
      <Route path="child" component={Child} />
    </Route>
  </Route>
);

export default routes;
