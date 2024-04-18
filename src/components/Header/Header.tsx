import React from 'react';
import { Link } from 'react-router';

export function Header() {
  return (
    <header className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page">Page</Link></li>
        <li><Link to="/loader">With Loader</Link></li>
        <li><Link to="/loader/child">With Nested Loader</Link></li>
      </ul>
    </header>
  );
}
