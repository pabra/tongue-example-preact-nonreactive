module.exports = {
  presets: [
    '@babel/preset-env',
    // ['preact-cli/babel', { modules: 'commonjs' }],
  ],
  plugins: [
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'h',
        pragmaFrag: 'Fragment',
      },
    ],
  ],
};
