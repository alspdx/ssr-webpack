import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

const render = (Component: React.ComponentType) => {
  ReactDOM.hydrate(<Component />, document.getElementById('root'));
};

render(App);
