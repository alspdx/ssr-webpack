import React from 'react';
import { IndexRoute, Route } from 'react-router';

import { Container } from './Container'
import { Home } from './Home'
import { Page } from './Page'
import { WithLoader } from './WithLoader'
import { WithLoaderChild } from './WithLoaderChild'

export const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
    <Route path="loader" component={WithLoader}>
      <Route path="child" component={WithLoaderChild} />
    </Route>
  </Route>
);
