var path = require('path');
module.exports = require('dotenv').config({
  silent: true,
  path: path.resolve(__dirname, '../../shared/.env')
});
