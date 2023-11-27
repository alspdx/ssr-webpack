import type { Configuration, Plugin } from 'webpack'
import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const isDevelopment = true;

const base: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  plugins: [
    // new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin() as any as Plugin, // @types/mini-css-extract-plugin is out of date
  ],
  module: {
    rules: [
      {
        // load typescript files, ignoring node_modules and dist
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.s?css$/,
        use: [
          // it is supposedly faster to use style-loader during development,
          // but I have not been able to get that working yet
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true, // identify .module.css files and interop with vanilla .css files
                localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64]',
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                ],
              },
            },
          },
        ],
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
};

const client: Configuration = {
  ...base,
  target: 'web',
  entry: [
    './src/client/index.tsx'
  ],
  plugins: [
    ...base.plugins || [],
    // clean webpack plugin targets output.path and should be used separately
    // for both client and server configs
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
  },
};

export const serverConfig: Configuration = {
  ...base,
  target: 'node',
  externals: [nodeExternals()], // node externals should not be bundled with server code
  entry: [
    './src/server/index.ts',
  ],
  plugins: [
    ...base.plugins || [],
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist/server'),
  },
};

export default [client, serverConfig];
