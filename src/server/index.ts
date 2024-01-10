import express from 'express';
import fs from 'fs';
import path from 'path';

import render from './render';

const PORT = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

app.use('*', (req, res) => {
  const manifest = fs.readFileSync(path.resolve(__dirname, '../webpack-manifest.json'), 'utf-8');
  const assetUrls = Object.values(JSON.parse(manifest)) as string[];

  render(req, res, assetUrls);
});

app.listen(PORT, () => {
  console.log('Server is listening on port %s', PORT);
});
