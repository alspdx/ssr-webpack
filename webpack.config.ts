import type { Configuration } from 'webpack'
import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import nodeExternals from 'webpack-node-externals';

const baseConfig: Configuration = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  stats: 'minimal',
  plugins: [
    // new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin(), // @types/mini-css-extract-plugin is out of date
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
          // style-loader shows FOUC with SSR, not sure what to do about that yet..
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true, // identify .module.css files and interop with vanilla .css files
                localIdentName: '[path][name]__[local]',
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
      },
      {
        // Webpack 5 asset/resource replaces file-loader
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      }
    ]
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
  },
  output: {
    filename: 'index.js',
    clean: true,
  }
};

export const clientConfig: Configuration = {
  ...baseConfig,
  target: 'web',
  entry: './src/client/index.tsx',
  output: {
    ...baseConfig.output,
    path: path.resolve(__dirname, 'dist/client'),
  },
};

export const serverConfig: Configuration = {
  ...baseConfig,
  target: 'node',
  externals: [nodeExternals()], // node externals should not be bundled with server code
  entry: './src/server/index.ts',
  output: {
    ...baseConfig.output,
    path: path.resolve(__dirname, 'dist/server'),
  },
};

export default [clientConfig, serverConfig];
