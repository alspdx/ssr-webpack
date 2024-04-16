import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Request, Response } from 'express';

import routes from '../app/routes';

export default function render(req: Request, res: Response, assetPaths: { styles: string[]; scripts: string[] }) {
  match(
    { routes, location: req.originalUrl },
    async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        res.status(500).send('Something bad happened');
      } else if (renderProps) {
        const results = await fetch('https://mobile-staging.gametime.co/v1/search?q=warriors');

        const componentsToRender = renderProps.components;
        const preloadMethods = componentsToRender
          .filter((component: any) => component?.loader)
          .map((component: any) => ({ name: component.name, loader: component.loader }));

        const preloadedData = await Promise.all(preloadMethods.map(async (c) => {
          return {
            name: c.name,
            data: await c.loader(),
          }
        }));

        res.status(200).send(`<!doctype html>
<html>
  <head>
    <title>React SSR Example</title>
    ${assetPaths.styles.map((path) => `<link rel="stylesheet" href="${path}" />`).join('\n')}
  </head>
  <body>
    <div id="root">${ReactDOM.renderToString(<RouterContext {...renderProps} />)}</div>
    ${assetPaths.scripts.map((path) => `<script src="${path}"></script>`).join('\n')}
    <script>
      window.__RESULTS__ = ${JSON.stringify(await results.json())};
      window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedData)};
    </script>
  </body>
</html>`);
      } else {
        res.status(404).send('Not found');
      }
    }
  );
}
