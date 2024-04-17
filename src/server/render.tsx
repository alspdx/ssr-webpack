import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { Request, Response } from 'express';

import { routes } from 'routes';
import { LoaderContextProvider, loadRouteData, getRouteLoaders } from 'context/LoaderContext';

export default function render(req: Request, res: Response, assetPaths: { styles: string[]; scripts: string[] }) {
  console.log('attempting to render', routes);
  match(
    { routes, location: req.originalUrl },
    async (error, redirectLocation, renderProps) => {
      console.log('renderProps: ', renderProps);

      if (redirectLocation) {
        console.log('Redirecting to:', redirectLocation.pathname + redirectLocation.search);
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        res.status(500).send('Something bad happened');
      } else if (renderProps) {
        const loaders = getRouteLoaders(renderProps.components);
        const preloadedData = await loadRouteData(loaders);

        res.status(200).send(`<!doctype html>
<html>
  <head>
    <title>React SSR Example</title>
    ${assetPaths.styles.map((path) => `<link rel="stylesheet" href="${path}" />`).join('\n')}
    <link
      rel="shortcut icon"
      type="image/png"
      href="${__PUBLIC_PATH_PREFIX__}favicon.ico?v=2"
    ></link>
    <link
      rel="shortcut icon"
      type="image/png"
      sizes="32x32"
      href="${__PUBLIC_PATH_PREFIX__}favicon-32x32.png?v=2"
    />
    <link
      rel="shortcut icon"
      type="image/png"
      sizes="16x16"
      href="${__PUBLIC_PATH_PREFIX__}favicon-16x16.png?v=2"
    />
  </head>
  <body>
    <script>
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedData)};
    </script>
    <div id="root">${ReactDOM.renderToString(<LoaderContextProvider routerProps={renderProps} preloadedState={preloadedData} />)}</div>
    ${assetPaths.scripts.map((path) => `<script src="${path}"></script>`).join('\n')}
  </body>
</html>`);
      } else {
        res.status(404).send('Not found');
      }
    }
  );
}
