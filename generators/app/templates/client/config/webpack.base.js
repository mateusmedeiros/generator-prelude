var webpack = require('webpack');
var path = require('path');
var srcPath = path.resolve(__dirname, '../app');
var destPath = path.resolve(__dirname, '../public/assets');
var uuid = require('uuid');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    'whatwg-fetch',
    path.resolve(srcPath, 'index.js'),
  ],
  output: {
    path: destPath,
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'app', 'config', 'test'],
    extensions: ['', '.js'],
  },
  module: {
    loaders: [
      { test: /\.(png|jpg|svg)$/, loader: 'url-loader?limit=10000&name=images/[hash].[ext]' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.yml$/, loaders: ['json', 'yaml'] },
      { test: /\.(ttf|woff|woff2|otf|eot)$/, loader: 'file-loader?name=fonts/[name].[ext]' },
      { test: /\.md$/, loader: 'raw-loader' },
    ]
  },
  postcss: function(webpack) {
    return [
      require("postcss-cssnext")(),
      require("postcss-reporter")()
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      '__BUILD_VERSION__': JSON.stringify(uuid.v4()),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_URL': JSON.stringify(process.env.API_URL)
      }
    })
  ]
}
