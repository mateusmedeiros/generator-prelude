'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gem = require('../../lib/gem');

var _gem2 = _interopRequireDefault(_gem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  gem: new _gem2.default({ name: 'seedbank' }),
  unchecked: true
}, { gem: new _gem2.default({ name: 'rack-cors' }) }, {
  gem: new _gem2.default({ name: 'redis', version: '~> 3.0' }),
  unchecked: true
}, {
  gem: new _gem2.default({ name: 'redis-rails', version: '~> 5.0' }),
  unchecked: true,
  comment: "already has 'redis' gem as a dependency",
  conflictsWith: 'redis'
}, {
  gem: new _gem2.default({ name: 'bcrypt', version: '~> 3.1.7' }),
  unchecked: true,
  comment: 'necessary for has_secure_password'
}, {
  gem: new _gem2.default({ name: 'factory_girl_rails', group: ['development', 'test'] }),
  unchecked: true
}, {
  gem: new _gem2.default({ name: 'rspec', version: '~> 3.5', group: ['development', 'test'] }),
  unchecked: true
}, {
  gem: new _gem2.default({ name: 'minitest-rails', version: '~> 3.0', group: ['development', 'test'] }),
  unchecked: true,
  conflictsWith: 'rspec'
}];
module.exports = exports['default'];