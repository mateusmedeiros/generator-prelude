var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server'
  ],

  module: {
    loaders: [
      { test: /\.(?:c|sc|sa)ss$/, loaders: ['style', 'css', 'sass'] }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  output: {
    publicPath: 'http://localhost:8081/',
    pathinfo: true
  }
};
