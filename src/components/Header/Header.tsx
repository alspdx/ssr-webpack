import React from 'react';
import { Link } from 'react-router';

export function Header() {
  return (
    <header className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page">Page</Link></li>
        <li><Link to="/with-module">With CSS Module</Link></li>
        <li><Link to="/nesting">Nesting</Link></li>
        <li><Link to="/nesting/child">Nesting Child</Link></li>
      </ul>
    </header>
  );
}
