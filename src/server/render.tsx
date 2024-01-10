import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Request, Response } from 'express';

import routes from '../app/routes';

export default function render(req: Request, res: Response, assetUrls: string[] = []) {
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

        const js = assetUrls
          .filter((url: string) => url.endsWith('.js'))
          .map((url: string) => `<script src=${url}></script>`)
          .join('\n');

        const css = assetUrls
          .filter((url: string) => url.endsWith('.css'))
          .map((url: string) => `<link rel="stylesheet" href=${url} />`)
          .join('\n');

        res.status(200).send(`<!doctype html>
<html>
  <head>
    <title>React SSR Example</title>
    ${css}
  </head>
  <body>
    <div id="root">${ReactDOM.renderToString(<RouterContext {...renderProps} />)}</div>
    ${js}
    <script>
      window.__RESULTS__ = ${JSON.stringify(await results.json())};
    </script>
  </body>
</html>`);
      } else {
        res.status(404).send('Not found');
      }
    }
  );
}
