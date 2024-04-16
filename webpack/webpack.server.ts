import type { Configuration } from 'webpack';
import NodemonPlugin from 'nodemon-webpack-plugin';
import path from 'path';
import { getCommonConfig } from './webpack.common';
import { merge } from 'webpack-merge';

const serverConfig = merge<Configuration>(getCommonConfig(false), {
  name: 'server',
  target: 'node',
  mode: 'none',
  entry: 'server/index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist/server'),
  },
  plugins: [
    new NodemonPlugin({
      nodeArgs: ['--openssl-legacy-provider'],
    })
  ],
  ignoreWarnings: [
    {
      // this is to ignore a specific warning from Express' legacy renderer
      // initializing with a dynamic require, it's not relevant to our use case
      // so we can safely ignore it
      module: /node_modules\/express\/lib\/view\.js/,
      message: /the request of a dependency is an expression/i,
    },
  ],
});

export default serverConfig;
