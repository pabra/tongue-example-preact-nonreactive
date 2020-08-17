const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode =
  process.env.npm_lifecycle_event === 'prod' ? 'production' : 'development';

const miniCssRule = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    hmr: mode === 'development',
  },
};

const common = {
  mode,
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: mode == 'production' ? '[name]-[hash].js' : '[name].js',
  },
  optimization: { noEmitOnErrors: true },
  plugins: [
    // Delete everything from output-path (/dist) and report to user
    new CleanWebpackPlugin({
      root: __dirname,
      exclude: [],
      verbose: true,
      dry: false,
    }),
    new HTMLWebpackPlugin({
      // Use this template to get basic responsive meta tags
      template: path.resolve(__dirname, 'src', 'index.html'),
      // inject details of output file at end of body
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: mode === 'production' ? '[name]-[hash].css' : '[name].css',
      chunkFilename: mode === 'production' ? '[name]-[hash].css' : '[name].css',
    }),
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat', // Must be below test-utils
    },
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      // {
      //   test: /\.ts(x?)$/,
      //   exclude: /node_modules/,
      //   loader: 'ts-loader',
      // },
      // // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      // },
      {
        test: /\.module\.(sa|sc|c)ss$/,
        use: [
          miniCssRule,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              // importLoaders: 1,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /\.module\./,
        use: [miniCssRule, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};

if (mode === 'development') {
  console.log('mode:', mode); // TODO: remove DEBUG
  module.exports = merge(common, {
    plugins: [
      // Suggested for hot-loading
      new webpack.NamedModulesPlugin(),
      // Prevents compilation errors causing the hot loader to lose state
      new webpack.NoEmitOnErrorsPlugin(),
      new ForkTsCheckerWebpackPlugin({
        eslint: { enabled: true, files: './src/*{.ts,.js,.tsx,.jsx}' },
      }),
    ],
  });
}

if (mode === 'production') {
  console.log('mode:', mode); // TODO: remove DEBUG
  module.exports = merge(common, {
    plugins: [
      new ForkTsCheckerWebpackPlugin({
        async: false,
      }),
    ],
  });
}
