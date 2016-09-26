'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GemPrompt = function (_BasePrompt) {
  _inherits(GemPrompt, _BasePrompt);

  function GemPrompt(_ref) {
    var context = _ref.context;
    var propertyName = _ref.propertyName;
    var gems = _ref.gems;

    _classCallCheck(this, GemPrompt);

    var _this = _possibleConstructorReturn(this, (GemPrompt.__proto__ || Object.getPrototypeOf(GemPrompt)).call(this, { context: context, propertyName: propertyName }));

    _this.gems = gems;
    _this.prompts = _this._generatePrompts(gems, _this.propertyName);
    return _this;
  }

  _createClass(GemPrompt, [{
    key: '_validate',
    value: function _validate(values) {
      var conflictingGems = (0, _lodash2.default)(this.gems).filter(function (g) {
        return (0, _lodash2.default)(values).includes(g.gem);
      }).map('conflictsWith').compact().flatten().value();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = conflictingGems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var conflictingGem = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = conflictingGem.conflictsWith[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var gemConflict = _step2.value;

              if ((0, _lodash2.default)(values).includes(gemConflict)) {
                return conflictingGem.gem.name + ' conflicts with ' + gemConflict + '.' + '\n' + 'Remove one of them and try again or, if you really want to ' + 'include both, add them manually to the resulting Gemfile.';
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }, {
    key: '_generatePrompts',
    value: function _generatePrompts(gems, propertyName) {
      return [{
        type: 'checkbox',
        name: propertyName,
        message: 'Select the gems you want to be included \
        (you will have the chance to manually adjust the resulting Gemfile)',
        choices: (0, _lodash2.default)(gems).map(function (g) {
          return {
            name: g.gem.name + ' ' + (g.comment ? '(' + g.comment + ')' : ''),
            checked: !g.unchecked,
            value: g.gem
          };
        }).value(),
        validate: this._validate.bind(this)
      }];
    }
  }, {
    key: 'defaultPropertyName',
    get: function get() {
      return 'gems';
    }
  }]);

  return GemPrompt;
}(_base2.default);

exports.default = GemPrompt;
module.exports = exports['default'];