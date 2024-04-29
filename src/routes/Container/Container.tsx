import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';

import './Container.css';

import { Header, Spinner } from 'components';

export function Container() {
  const nav = useNavigation();
  return (
    <div className="container">
      {nav.state === 'loading' && <Spinner />}
      <Header />
      <Outlet />
    </div>
  );
}
