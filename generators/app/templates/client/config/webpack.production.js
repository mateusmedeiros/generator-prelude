var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.base');
var merge = require('webpack-merge');
var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseConfig, {
  output: {
    publicPath: "/assets/"
  },
  module: {
    loaders: [
      { test: /\.js(x)?$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ loader: 'style-loader!css-loader?<%- enableCssModules ? 'modules&' : '' %>camelCase=dashes&localIdentName=[local]---[hash:base64:6]!postcss-loader' }) },
    ]
  },
  plugins: [
    new CompressionPlugin(),
    new ExtractTextPlugin("bundle.css"),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      sourceMap: false,
      mangle: {
        except: ['$', 'exports', 'require', '_', 'React', 'ReactDOM']
      }
    })
  ]
});
