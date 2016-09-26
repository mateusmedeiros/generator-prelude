var webpack = require('webpack');
var path = require('path');
var srcPath = path.resolve(__dirname, '../../client');
var destPath = path.resolve(__dirname, '../../public/assets');
var nodeModulesPath = path.resolve(__dirname, '../../node_modules');
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
    publicPath: '/assets/',
    filename: 'bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'client', 'test/client'],
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
      require('postcss-import')({
        addDependencyTo: webpack,
        root: rootPath,
        path: [srcPath, nodeModulesPath]
      }),
      require('postcss-cssnext')({
        features: {
          customProperties: { preserve: 'computed' }
        }
      }),
      require('postcss-reporter')({ clearMessages: true })
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
