import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Container from './Container/Container';
import Home from './Home/Home';
import Page from './Page/Page';
import WithModule from './WithModule/WithModule';

const routes = (
  <Route path="/" component={Container}>
    <IndexRoute component={Home} />
    <Route path="page" component={Page} />
    <Route path="with-module" component={WithModule} />
  </Route>
);

export default routes;
