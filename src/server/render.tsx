import React from 'react';
import ReactDOM from 'react-dom/server';
import { match } from 'react-router';
import { Request, Response } from 'express';

import { LoaderContextProvider, loadRouteData, getRouteLoaders } from 'context';
import { routes } from 'routes';

import { AssetPaths, renderStaticHtml } from './renderStaticHtml';

export default function render(req: Request, res: Response, assets: AssetPaths) {
  match(
    { routes, location: req.originalUrl },
    async (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        console.log('Redirecting to:', redirectLocation.pathname + redirectLocation.search);
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        console.error('ROUTER ERROR:', error);
        res.status(500).send('Something bad happened');
      } else if (renderProps) {
        const loaders = getRouteLoaders(renderProps.components);
        const preloadedData = await loadRouteData(loaders);

        const content = ReactDOM.renderToString(
          <LoaderContextProvider
            routerProps={renderProps}
            preloadedState={preloadedData}
          />
        );

        const html = renderStaticHtml({ assets, content, preloadedData });

        res.status(200).send(html);
      } else {
        res.status(404).send('Not found');
      }
    }
  );
}
