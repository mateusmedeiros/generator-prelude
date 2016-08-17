var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  module: {
    loaders: [
      { test: /\.(?:c|sc|sa)ss$/,
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
}
