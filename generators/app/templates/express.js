var path = require('path');
var url = require('url');
var proxy = require('proxy-middleware');
var history = require('connect-history-api-fallback');
var serveStatic = require('express').static;
var mainServer = require('express')();

var port = process.env.NODE_ENV == 'production' ? process.env.PORT : 8080;

mainServer.use('/api', proxy(url.parse('http://localhost:3000')))
mainServer.use(history());

if (process.env.NODE_ENV !== 'production') {
  mainServer.get('/assets/bundle.css', function(req, res) {
    res.set('Content-Type', 'text/css');
    res.end();
  });

  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var webpackConfig = require('./config/webpack');

  var devServer = new WebpackDevServer(webpack(webpackConfig), {
    contentBase: path.join(__dirname, 'public', 'assets'),
    hot: true,
    publicPath: 'http://localhost:8081/',
    stats: {
      color: true,
      errorDetails: true
    }
  });

  mainServer.use('/assets', proxy(url.parse('http://localhost:8081')));

  devServer.listen(8081);
}

mainServer.use('/', serveStatic(path.join(__dirname, 'public')));

mainServer.listen(port);
