'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('lib/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var prompts = require('./prompts');
var _ = require('lodash');

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.appName = this.fs.readJSON(this.destinationPath('client/package.json')).name;
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      prompts.bind(this)(); // Temporary
    }
  }, {
    key: 'writing',
    value: function writing() {
      if (this.envFile) {
        this.fs.write(this.destinationPath('shared/.env'), this.envFile);
      } else {
        this.fs.copyTpl(this.templatePath('shared/.env'), this.destinationPath('shared/.env'), { appName: _.snakeCase(this.appName) });
      }
    }
  }, {
    key: 'install',
    value: function install() {
      var _this2 = this;

      this.npmInstall();

      this.spawnWithPromise('gem', ['install', 'bundler', '--conservative']).then(function () {
        return _this2.spawnWithPromise('ruby', [_this2.destinationPath('bin', 'bundle'), 'install']);
      }).then(function () {
        _this2.spawnWithPromise('ruby', [_this2.destinationPath('bin', 'rails'), 'db:setup']);
        _this2.spawnWithPromise('ruby', [_this2.destinationPath('bin', 'rails'), 'log:clear', 'tmp:clear']);
      });
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];