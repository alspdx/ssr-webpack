import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Container } from './Container'
import { Home } from './Home'
import { Page } from './Page'
import { WithModule } from './WithModule'
import { WithNestedRoute } from './WithNestedRoute'
import { WithNestedRouteChild } from './WithNestedRouteChild'

export const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
    <Route path="with-module" component={WithModule} />
    <Route path="nesting" component={WithNestedRoute}>
      <Route path="child" component={WithNestedRouteChild} />
    </Route>
  </Route>
);
