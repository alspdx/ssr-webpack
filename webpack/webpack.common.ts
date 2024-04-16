import { Configuration, DefinePlugin } from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';

const serverPort = 3000;
export const clientPort = serverPort + 1;

export function getCommonConfig(isClient: boolean): Configuration {
  const srcPath = path.resolve(__dirname, '../src');
  const domain = 'localhost';

  const publicPath = `http://${domain}:${clientPort}/`;

  return {
    mode: 'development',
    context: srcPath,
    resolve: {
      modules: ['node_modules', srcPath],
      extensions: ['.json', '.js', '.jsx', '.ts', '.tsx'],
    },
    output: {
      clean: true,
      publicPath,
    },
    performance: {
      hints: false,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          include: path.resolve(__dirname, '../src'),
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                isClient && 'react-refresh/babel',
              ].filter(Boolean),
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
                import: true,
                sourceMap: true,
                modules: {
                  auto: true,
                  localIdentName: '[path][name]__[local]'
                },
              },
            },
            'postcss-loader',
            'resolve-url-loader',
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: 'expanded',
                  includePaths: [path.resolve(__dirname, '../src/styles')],
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: '[name].[contenthash][ext]',
            emit: isClient
          },
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        ignoreOrder: true,
      }),
      new DefinePlugin({
        __PUBLIC_PATH_PREFIX__: JSON.stringify(publicPath),
      }),
      isClient && new ReactRefreshWebpackPlugin(),
    ].filter(Boolean),
  };
}
