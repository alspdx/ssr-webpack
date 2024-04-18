import React from 'react';
import { browserHistory, Router, RouterState } from 'react-router';

import { routes } from 'routes';
import { LoaderContextProvider } from 'context/LoaderContext/LoaderContext';

import './reset.css';

interface RouterProps {
  // router: this.router,
  location: RouterState['location'];
  params: RouterState['params'];
  components: RouterState['components'];
  routes: RouterState['routes'];
}

export default function App() {
  return (
    <Router
      history={browserHistory}
      render={(routerProps: RouterProps) =>
        <LoaderContextProvider
          routerProps={routerProps}
          preloadedState={window.__PRELOADED_STATE__}
        />
      }
    >
      {routes}
    </Router>
  );
}
