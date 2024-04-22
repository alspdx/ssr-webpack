import React from 'react';
import ReactDOM from 'react-dom/server';
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router-dom/server';

import { Request as ExpressReq, Response as ExpressRes } from 'express';

import { routes } from 'routes';
import { renderStaticHtml } from './renderStaticHtml';

const staticHandler = createStaticHandler(routes);

/**
 * adapter to use react-router-dom's static handler with express
 *
 * Borrowed from React Router documentation and modified slightly, but
 * importable from Remix's Express adapter.
 */
function createFetchRequestFromExpressRequest(req: ExpressReq, res: ExpressRes) {
  const origin = `${req.protocol}://${req.get("host")}`;
  const url = new URL(req.originalUrl || req.url, origin);

  const controller = new AbortController();
  res.on("close", () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body;
  }

  return new globalThis.Request(url.href, init);
};

export default async function render(req: ExpressReq, res: ExpressRes, assets: { styles: string[]; scripts: string[] }) {
  const request = createFetchRequestFromExpressRequest(req, res);

  const context = await staticHandler.query(request);

  if (context instanceof globalThis.Response) {
    throw context;
  }

  const staticRouter = createStaticRouter(staticHandler.dataRoutes, context);

  const content = ReactDOM.renderToString(
    <StaticRouterProvider router={staticRouter} context={context} />
  )

  res.send(renderStaticHtml({ assets, content }));
}
