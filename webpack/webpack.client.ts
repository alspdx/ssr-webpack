/// <reference types="webpack-dev-server" />

import type { Configuration } from 'webpack';
import path from 'path';
import { WebpackManifestPlugin } from 'webpack-manifest-plugin';
import { merge } from 'webpack-merge';
import CopyPlugin from 'copy-webpack-plugin';

import { clientPort, getCommonConfig } from './webpack.common';

const clientConfig = merge<Configuration>(getCommonConfig(true), {
  name: 'client',
  target: 'web',
  devtool: 'eval-cheap-source-map',
  resolve: {
    fallback: {
      // config.resolve allows configuring custom import resolution for modules
      // TODO: do not import Apptimize server SDK in client code and remove this
      fs: false,
    },
  },
  entry: {
    main: './client.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist/client'),
  },
  devServer: {
    devMiddleware: {
      serverSideRender: true,
    },
    https: false,
    static: path.resolve(__dirname, '../dist/client'),
    hot: false, // optional via `npm run hot`
    liveReload: false,
    port: clientPort,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
  plugins: [
    new WebpackManifestPlugin({
      writeToFileEmit: true,
      fileName: path.resolve(__dirname, '../dist/client/assets.json'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: path.resolve(__dirname, '../dist/client'),
        },
      ],
    }),
  ].filter(Boolean),
  optimization: {
    usedExports: true,
    minimize: true,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
});

export default clientConfig;
