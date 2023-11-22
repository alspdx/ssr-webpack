import React from 'react';
import { Link } from 'react-router';

import './Container.css';

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      <div className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/page">Page</Link></li>
          <li><Link to="/with-module">With CSS Module</Link></li>
        </ul>
      </div>
      {children}
    </div>
  );
}
