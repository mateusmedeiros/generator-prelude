'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _gems2 = require('./gems');

var _gems3 = _interopRequireDefault(_gems2);

var _prompts = require('./prompts');

var _prompts2 = _interopRequireDefault(_prompts);

var _gem = require('../../lib/gem');

var _gem2 = _interopRequireDefault(_gem);

var _base = require('../../lib/base');

var _base2 = _interopRequireDefault(_base);

var _gem3 = require('../../lib/prompts/gem');

var _gem4 = _interopRequireDefault(_gem3);

var _booleanConfig = require('../../lib/prompts/boolean-config');

var _booleanConfig2 = _interopRequireDefault(_booleanConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class() {
    var _ref;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

    _this.argument('appName', {
      type: String,
      required: true,
      description: 'The name of the application'
    });
    return _this;
  }

  _createClass(_class, [{
    key: 'initializing',
    value: function initializing() {
      this.log('\n');
      this.log(_chalk2.default.bold.white('          ######                                                     '));
      this.log(_chalk2.default.bold.white('          #     # #####  ###### #      #    # #####  ######          '));
      this.log(_chalk2.default.bold.white('          #     # #    # #      #      #    # #    # #               '));
      this.log(_chalk2.default.bold.white(' #####    ######  #    # #####  #      #    # #    # #####     ##### '));
      this.log(_chalk2.default.bold.white('          #       #####  #      #      #    # #    # #               '));
      this.log(_chalk2.default.bold.white('          #       #   #  #      #      #    # #    # #               '));
      this.log(_chalk2.default.bold.white('          #       #    # ###### ######  ####  #####  ######          '));
      this.log('\n');
    }
  }, {
    key: 'configuring',
    value: function configuring() {
      this.config.set({
        appName: this.appName,
        enableCssModules: this.enableCssModules,
        gems: this.gems.map(function (g) {
          return g.name;
        }),
        generatorVersion: this.fs.readJSON(require.resolve('../../package.json')).version
      });

      this.templateVars = _lodash2.default.merge(this.config.getAll(), {
        gemfileGems: _gem2.default.generateGemDeclarations(this.gems),
        _: _lodash2.default // Includes lodash for simple manipulations in the templates
      });

      this.destinationRoot(_lodash2.default.kebabCase(this.appName));
    }
  }, {
    key: 'writing',
    value: function writing() {
      var from = this.templatePath('.');
      var to = this.destinationPath('.');

      this.fs.copyTpl(from, to, this.templateVars);

      // See https://github.com/npm/npm/issues/7252 for why this is needed
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _fs2.default.readdirSync(this.templatePath())[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var file = _step.value;

          if (file.charAt(0) === '_') {
            this.fs.move(this.destinationPath(file), this.destinationPath('.' + file.substr(1)));
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
    }
  }, {
    key: 'install',
    value: function install() {
      // TODO: this.composeWith('prelude:setup', {}, { local: require.resolve('../setup') });
    }
  }, {
    key: 'end',
    value: function end() {
      var _this2 = this;

      this.spawnWithPromise('git', ['init']).then(function () {
        return _this2.spawnWithPromise('git', ['add', '.']);
      }).then(function () {
        return _this2.spawnWithPromise('git', ['commit', '-m', 'Initial commit', '--quiet']);
      });
    }
  }, {
    key: 'prompting',
    get: function get() {
      return {
        gems: function gems() {
          var gemPrompt = new _gem4.default({
            gems: _gems3.default,
            context: this,
            propertyName: 'gems'
          });
          return gemPrompt.renderPrompt();
        },
        cssModules: function cssModules() {
          var cssModulesPrompt = new _booleanConfig2.default({
            message: 'Would you like to enable css-modules support \
                      (https://github.com/css-modules/css-modules for more info)?',
            context: this,
            propertyName: 'enableCssModules'
          });
          return cssModulesPrompt.renderPrompt();
        }
      };
    }
  }]);

  return _class;
}(_base2.default);

exports.default = _class;
module.exports = exports['default'];