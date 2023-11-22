import React from 'react';
import ReactDOM from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import { Request, Response } from 'express';

import routes from '../app/routes';  

function Html({ content }: { content: React.ReactElement }) {
  return (
    <html>
      <head>
        <title>React SSR</title>
        <link rel="stylesheet" href="main.css" />
      </head>
      <body>
        <div id="root">{content}</div>
        <script src="client.js" /> 
      </body>
    </html>
  )
}

export default function renderApp(req: Request, res: Response) {
  match(
    { routes, location: req.originalUrl }, 
    (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        // it isn't clear when a React Router match error would happen but 
        // it should be handled anyway
        console.error('ROUTER ERROR:', error);
        res.status(500).send('Something bad happened');
      } else if (renderProps) {
        res.status(200).send(
          '<!doctype html>\n' +
          ReactDOM.renderToString(
            <Html content={<RouterContext {...renderProps} />} />
          )
        );
      } else {
        res.status(404).send('Not found');
      }
    }
  );
}