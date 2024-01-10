import type { Configuration } from 'webpack';
import path from 'path'
import nodeExternals from 'webpack-node-externals';
import NodemonPlugin from 'nodemon-webpack-plugin';

import { merge } from 'webpack-merge';

import { getCommonConfig } from './webpack.common';

const serverConfig = merge<Configuration>(getCommonConfig(false), {
  name: 'server',
  target: 'node',
  stats: {
    all: true,
  },
  // server should only be bundled into a single chunk
  entry: './server/index.ts',
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    // output filename should be consistent, no hashing, so we can call it from
    // the start script
    filename: 'index.js',
    clean: true,
  },
  externals: [nodeExternals()],
  plugins: [
    new NodemonPlugin({
      nodeArgs: ['--experimental-fetch'],
    }),
  ],
});

export default serverConfig;
