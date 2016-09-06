require('./env');
var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.base');
var merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  entry: [
    'webpack-dev-server/client?' + process.env.WEBPACK_DEV_SERVER_URL,
    'webpack/hot/only-dev-server'
  ],
  output: {
    pathinfo: true,
    publicPath: process.env.WEBPACK_DEV_SERVER_URL
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
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '../public/assets'),
    publicPath: process.env.WEBPACK_DEV_SERVER_URL,
    port: 8081, // TODO: Parse WEBPACK_DEV_SERVER_URL
    historyApiFallback: true,
    hot: true,
    noCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    stats: {
      color: true,
      errorDetails: true
    }
  }
});
