import express from 'express';
import http from 'http'; 

import renderApp from './renderApp'; 

const PORT = 3000;

const app = express();

app.use(express.static('dist'));

app.use(renderApp);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('Server is listening on port %s', PORT);
});


