var path = require('path');
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var webpackConfig = require('./config/client/webpack.development.js');

var devServer = new WebpackDevServer(webpack(webpackConfig), {
  contentBase: path.join(__dirname, 'public/assets'),
  historyApiFallback: true,
  hot: true,
  publicPath: '/assets/',
  progress: true,
  stats: {
    color: true,
    errorDetails: true
  }
});

devServer.listen(8080);
