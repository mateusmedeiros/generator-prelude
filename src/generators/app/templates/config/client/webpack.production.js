var path = require('path');
var webpack = require('webpack');
var baseConfig = require('./webpack.base');
var merge = require('webpack-merge');
var CompressionPlugin = require('compression-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = merge(baseConfig, {
  output: {
    filename: 'bundle-[hash].js'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&camelCase=dashes&localIdentName=[local]---[hash:base64:6]!postcss-loader') },
      { test: /\.js(x)?$/, exclude: /node_modules/, loaders: ['babel'] },
    ]
  },
  plugins: [
    new AssetsPlugin({
      path: path.join(__dirname, '../../public/assets'),
      filename: 'manifest.json'
    }),
    new CompressionPlugin(),
    new ExtractTextPlugin('bundle-[hash].css'),
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
