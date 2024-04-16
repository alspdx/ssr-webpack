module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        version: '^7.22.10', // @babel/runtime-corejs3 version
      },
    ],
  ],
};
