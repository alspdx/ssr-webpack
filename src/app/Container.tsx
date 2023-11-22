import React from 'react';

import './Container.css';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="navbar">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/page">Page</a></li>
          <li><a href="/with-module">With CSS Module</a></li>
        </ul>
      </div>
      {children}
    </div>
  );
}
