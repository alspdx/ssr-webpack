import type { Configuration } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export const isProduction = process.env.NODE_ENV === 'production';

const srcPath = path.resolve(__dirname, '../src');
const publicPath = isProduction ? '/' : 'http://localhost:3001/';

export function getCommonConfig(isClient: boolean): Configuration {
  return {
    mode: isProduction ? 'production' : 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
      modules: ['node_modules', srcPath],
    },
    context: srcPath,
    output: {
      publicPath,
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isProduction ? '[name].[contenthash].css' : '[name].css',
        ignoreOrder: true,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [isClient && !isProduction && 'react-refresh/babel'].filter(Boolean),
            },
          }
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                emit: isClient,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
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
          test: /\.(png|svg|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            emit: isClient, // no emit for ssr
          },
        },
      ],
    }
  };
}
