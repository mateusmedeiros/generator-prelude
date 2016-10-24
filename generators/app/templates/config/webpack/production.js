var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    loaders: [
      { test: /\.(?:c|sc|sa)ss$/,
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      }
    ]
  },

  output: {
    publicPath: '/assets/'
  },

  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
}
