require('./config/env');
var path = require('path');
var url = require('url');
var proxy = require('proxy-middleware');
var history = require('connect-history-api-fallback');
var serveStatic = require('express').static;
var server = require('express')();

var port = process.env.NODE_ENV == 'production' ? process.env.PORT : 8080;

server.use(history());
server.use('/', serveStatic(path.join(__dirname, 'public')));

if(process.env.NODE_ENV !== 'production') {
  server.use('/', proxy(url.parse(process.env.WEBPACK_DEV_SERVER_URL)))
}

server.use('/', proxy(url.parse(process.env.API_URL)));

server.listen(port);

// TODO: Start webpack-dev-server from server.js
