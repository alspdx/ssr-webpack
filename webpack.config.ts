import path from 'path';

const base = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, /dist/],
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