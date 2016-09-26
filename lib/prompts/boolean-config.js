'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base = require('./base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BooleanConfigPrompt = function (_BasePrompt) {
  _inherits(BooleanConfigPrompt, _BasePrompt);

  function BooleanConfigPrompt(_ref) {
    var context = _ref.context;
    var propertyName = _ref.propertyName;
    var message = _ref.message;

    _classCallCheck(this, BooleanConfigPrompt);

    var _this = _possibleConstructorReturn(this, (BooleanConfigPrompt.__proto__ || Object.getPrototypeOf(BooleanConfigPrompt)).call(this, { context: context, propertyName: propertyName }));

    _this.message = message;
    _this.prompts = [{
      message: message,
      type: 'confirm',
      name: propertyName
    }];
    return _this;
  }

  return BooleanConfigPrompt;
}(_base2.default);

exports.default = BooleanConfigPrompt;
module.exports = exports['default'];