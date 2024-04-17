import React from 'react';

import './Container.css';

import { Header } from 'components';

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <Header />
      {children}
    </div>
  );
}
