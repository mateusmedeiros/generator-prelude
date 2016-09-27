var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.base');
var merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    'webpack/hot/only-dev-server'
  ],
  output: {
    pathinfo: true,
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap&<%- enableCssModules ? 'modules&' : '' %>camelCase=dashes&localIdentName=[local]---[hash:base64:6]!postcss-loader' },
      { test: /\.js(x)?$/, exclude: /node_modules/, loaders: ['babel'] }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  debug: true,
  devtool: 'source-map'
});
