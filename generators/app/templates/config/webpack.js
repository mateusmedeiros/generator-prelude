var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');

var commonConfig = {
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    path.join(__dirname, '..', 'app', 'client', 'js', 'index.js'),
    path.join(__dirname, '..', 'app', 'client', 'css', 'index.js')
  ],

  output: {
		path: path.join(__dirname, '..', 'public', 'assets'),
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, 
        exclude: /node_modules/, 
        loaders: [
          'react-hot',
          'babel' + '?' + JSON.stringify({
            plugins: ['transform-decorators-legacy'],
            presets: ['react', 'es2015', 'stage-1']
          })
        ]
      },

      { test: /\.yml$/, loaders: ['json', 'yaml'] },

      { test: /\.(?:png|jpg|gif|ttf|eot|woff|otf|woff2)$/,
        loaders: [
          'url' + '?' + JSON.stringify({
            limit: 20000
          })
        ] 
      }
    ] 
  },

  resolve: {
    extensions: [ '', '.js', '.jsx' ],
    modulesDirectories: [
      'app/client/js',
      'app/client/css',
      'app/client/assets',
      'config',
      'node_modules'
    ]
  }
};

if (process.env.NODE_ENV === 'production') {
  var prodConfig = require('./webpack/production');
  module.exports = merge.smart(commonConfig, prodConfig);
} else {
  var devConfig = require('./webpack/development');
  module.exports = merge.smart(commonConfig, devConfig);
}
