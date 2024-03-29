import React from 'react';
import { browserHistory, Router } from 'react-router';

import routes from 'app/routes';

export default function App() {
  return (
    <Router history={browserHistory}>
      {routes}
    </Router>
  );
}
