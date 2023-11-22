import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
const element = document.getElementById('root');

ReactDOM.hydrate(<App />, element);
