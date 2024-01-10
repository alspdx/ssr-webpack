import type { Configuration } from 'webpack';
import path from 'path';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import 'webpack-dev-server';

import { merge } from 'webpack-merge';

import { getCommonConfig, isProduction } from './webpack.common';

const outputPath = path.resolve(__dirname, '../dist/client');

const clientConfig = merge<Configuration>(getCommonConfig(true), {
  name: 'client',
  target: 'web',
  entry: {
    vendor: ['react', 'react-dom'],
    main: {
      dependOn: 'vendor',
      import: './client/index.tsx',
    },
  },
  output: {
    path: outputPath,
    filename: isProduction ? '[name].[contenthash].js' : '[name].js',
    clean: true,
  },
  devServer: {
    devMiddleware: {
      serverSideRender: true,
    },
    client: {
      // set logging to 'verbose' or 'info' for debugging hot reloading or
      // other dev server issues
      logging: 'warn',
    },
    liveReload: false,
    static: outputPath,
    hot: true,
    port: 3001,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new WebpackManifestPlugin({
      writeToFileEmit: true,
      fileName: path.resolve(__dirname, '../dist/webpack-manifest.json')
    }),
  ],
});

export default clientConfig;
