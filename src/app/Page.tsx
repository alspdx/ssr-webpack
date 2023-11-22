import React from 'react';

import './Page.css';

export function Page() {
  return (
    <div 
      onClick={() => console.log('Hello, you clicked?')} 
      className="page"
    >
      <h1>Some other page...</h1>
    </div>
  );
}