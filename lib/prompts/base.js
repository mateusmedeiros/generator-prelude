'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BasePrompt = function () {
  function BasePrompt(_ref) {
    var context = _ref.context;
    var propertyName = _ref.propertyName;

    _classCallCheck(this, BasePrompt);

    if (this.constructor === BasePrompt) {
      throw TypeError('Tried to instantiate BasePrompt directly');
    }

    this.context = context;
    this.propertyName = propertyName || this.defaultPropertyName;
  }

  _createClass(BasePrompt, [{
    key: 'renderPrompt',
    value: function renderPrompt() {
      var _this = this;

      return _inquirer2.default.prompt(this.prompts).then(function (answers) {
        _this.context[_this.propertyName] = answers[_this.propertyName];
      });
    }
  }, {
    key: 'defaultPropertyName',
    get: function get() {
      throw Error(this.constructor.name + ' does not override the defaultPropertyName getter. Please use an explicit propertyName.');
    }
  }]);

  return BasePrompt;
}();

exports.default = BasePrompt;
module.exports = exports['default'];