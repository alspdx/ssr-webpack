import React from 'react';
import { Route, createRoutesFromElements } from 'react-router';

import { Container } from './Container'
import { Home } from './Home'
import { Page } from './Page'
import { WithLoader } from './WithLoader'
import { WithLoaderChild } from './WithLoaderChild'

export const routes = createRoutesFromElements(
  <Route path="/" element={<Container />}>
    <Route index element={<Home />} />
    <Route path="page" element={<Page />} />
    <Route path="loader" element={<WithLoader />} loader={WithLoader.loader}>
      <Route path="child" element={<WithLoaderChild />} loader={WithLoaderChild.loader} />
    </Route>
  </Route>
);
