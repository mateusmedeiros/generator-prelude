require('./env');
var webpack = require('webpack');
var baseConfig = require('./webpack.development');
var merge = require('webpack-merge');
var nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
  target: 'node',
  externals: [nodeExternals()],
});
