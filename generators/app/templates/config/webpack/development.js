var webpack = require('webpack');

module.exports = {
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
  }
}
