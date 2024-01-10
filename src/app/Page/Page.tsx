import React from 'react';

import catPath from '../Home/cat.jpg';

import './Page.css';

export default function Page() {
  return (
    <div
      onClick={() => console.log('Hello, you clicked?')}
      className="page"
    >
      <h1>Some other page...</h1>
      <div style={{ width: '100%', border: '1px solid red' }}>
        <img style={{ width: '100%' }} src={catPath} />
      </div>
    </div>
  );
}
