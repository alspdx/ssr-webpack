import React from 'react';
import { Route, Routes } from 'react-router';

import { Container } from './Container'
import { Home } from './Home'
import { Page } from './Page'
import { WithLoader } from './WithLoader'
import { WithLoaderChild } from './WithLoaderChild'

export const routes = (
  <Route path="/" element={<Container />}>
    <Route index element={<Home />} />
    <Route path="page" element={<Page />} />
    <Route path="loader" element={<WithLoader />} loader={WithLoader.dataLoader}>
      <Route path="child" element={<WithLoaderChild />} loader={WithLoaderChild.dataLoader} />
    </Route>
  </Route>
);
