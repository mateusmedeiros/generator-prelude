'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gem = require('../../lib/gem');

var _gem2 = _interopRequireDefault(_gem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  gems: function gems() {
    var _this = this;

    this.log('\n');

    return this.prompt([{
      type: 'checkbox',
      name: 'gems',
      message: 'Select the gems you want to be included \
        (you will have the chance to manually adjust the resulting Gemfile)',
      choices: [{
        name: 'seedbank',
        checked: true,
        value: new _gem2.default({ name: 'seedbank' })
      }, {
        name: 'rack-cors',
        checked: true,
        value: new _gem2.default({ name: 'rack-cors' })
      }, {
        name: 'redis',
        checked: true,
        value: new _gem2.default({ name: 'redis', version: '~> 3.0' })
      }, {
        name: "redis-rails (already has 'redis' gem as a dependency)",
        checked: true,
        value: new _gem2.default({ name: 'redis-rails', version: '~> 5.0' })
      }, {
        name: 'bcrypt (necessary for has_secure_password)',
        checked: true,
        value: new _gem2.default({ name: 'bcrypt', version: '~> 3.1.7' })
      }, {
        name: 'factory_girl_rails',
        checked: true,
        value: new _gem2.default({ name: 'factory_girl_rails', group: ['development', 'test'] })
      }]
    }]).then(function (answers) {
      return _this.gems = answers.gems;
    });
  },
  cssModules: function cssModules() {
    var _this2 = this;

    this.log('\n');

    return this.prompt([{
      type: 'confirm',
      name: 'enableCssModules',
      message: 'Would you like to enable css-modules support \
                  (https://github.com/css-modules/css-modules for more info)?'
    }]).then(function (answers) {
      return _this2.enableCssModules = answers.enableCssModules;
    });
  }
};
module.exports = exports['default'];