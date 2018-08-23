'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: './src',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: './'
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|mjs)$/,
            include: path.resolve(__dirname, 'src'),
            loader: 'babel-loader',
            options: {
              compact: true,
            },
          },
          {
            test: /\.rs$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  compact: true,
                }
              },
              {
                loader: 'rust-native-wasm-loader',
                options: {
                  release: true,
                  wasmBindgen: {
                    wasm2es6js: true,
                  },
                }
              }
            ]
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};