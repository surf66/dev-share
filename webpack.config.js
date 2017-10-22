const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

var config = {
  entry: './client/js/index.js',
  output: {
    filename: 'dev-share.js',
    path: path.join(__dirname, './web/js'),
    publicPath: 'js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
          presets: ['es2015', 'react']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'client/index.html', to: '../index.html' }
    ])
  ],
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    }
  }
};

module.exports = [config];
