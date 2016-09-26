'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gem = function () {
  function Gem(_ref) {
    var name = _ref.name;
    var version = _ref.version;
    var group = _ref.group;

    _classCallCheck(this, Gem);

    if (!name) {
      throw TypeError('Invalid gem name: ' + (name === '' ? '<empty>' : name));
    }

    this.name = name;
    this.version = version;
    this.group = group;
  }

  _createClass(Gem, [{
    key: 'gemString',
    get: function get() {
      if (this.version) {
        return 'gem \'' + this.name + '\', \'' + this.version + '\'';
      } else {
        return 'gem \'' + this.name + '\'';
      }
    }
  }], [{
    key: 'groupHeader',
    value: function groupHeader(group) {
      if ((0, _lodash2.default)(group).isString()) {
        group = group.split(',');
      }

      return 'group ' + group.map(function (g) {
        return ':' + g;
      }).join(', ') + ' do';
    }
  }, {
    key: 'generateGemDeclarations',
    value: function generateGemDeclarations(gems) {
      var _this = this;

      var groupedGems = (0, _lodash2.default)(gems).groupBy(function (g) {
        if (g.group) {
          return g.group;
        }
        return 'none';
      }).value();

      var gemsWithNoGroup = (0, _lodash2.default)(groupedGems.none).map('gemString').join('\n');

      var groups = (0, _lodash2.default)(groupedGems).omit('none').map(function (gems, group) {
        return _this.groupHeader(group) + '\n' + gems.map(function (g) {
          return '  ' + g.gemString;
        }).join('\n') + '\n' + 'end';
      }).value();

      return gemsWithNoGroup + '\n\n' + groups.join('\n\n');
    }
  }]);

  return Gem;
}();

exports.default = Gem;
module.exports = exports['default'];