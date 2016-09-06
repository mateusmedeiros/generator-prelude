require('./env');
var webpack = require('webpack');
var baseConfig = require('./webpack.base');
var merge = require('webpack-merge');
var nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&modules&camelCase=dashes&localIdentName=[local]---[hash:base64:6]!postcss-loader' },
      { test: /\.js(x)?$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  },
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  debug: true,
  devtool: 'source-map',
  target: 'node',
  externals: [nodeExternals()],
});
