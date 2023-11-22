import path from 'path';
import webpack, { Plugin } from 'webpack';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isDevelopment = true;

const base: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  plugins: [new MiniCssExtractPlugin() as any as Plugin], // @types/mini-css-extract-plugin is out of date
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[path][name]__[local]--[hash:base64]',
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

const client = {
  ...base,
  target: 'web',
  entry: './src/client/index.tsx',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const server = {
  ...base,
  target: 'node',
  entry: './src/server/index.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

export default [client, server];
