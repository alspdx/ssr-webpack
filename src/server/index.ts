import express from 'express';
import fs from 'fs';
import path from 'path';

import render from './render';

const PORT = 3000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client')));

function getStaticAssetPaths() {
  const data = fs.readFileSync(
    path.resolve(__dirname, '../client/assets.json'),
    'utf-8'
  );
  const assets = (JSON.parse(data) || {}) as Record<string, string>;

  const assetPaths = Object.values(assets).reduce(
    (assets, path) => {
      if (path.endsWith('.css')) {
        assets.styles.push(path);
      } else if (path.endsWith('.js')) {
        assets.scripts.push(path);
      }
      return assets;
    },
    { styles: [], scripts: [] } as { styles: string[]; scripts: string[] }
  );

  return assetPaths;
}

app.use('*', (req, res) => {
  const assetPaths = getStaticAssetPaths();

  render(req, res, assetPaths);
});

app.listen(PORT, () => {
  console.log('Server is listening on port %s', PORT);
});
