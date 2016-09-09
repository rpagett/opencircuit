'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Reclassify = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = require('../../forms/components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Reclassify = exports.Reclassify = function (_React$Component) {
  _inherits(Reclassify, _React$Component);

  function Reclassify() {
    _classCallCheck(this, Reclassify);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Reclassify).apply(this, arguments));
  }

  _createClass(Reclassify, [{
    key: 'render',
    value: function render() {
      var unit = this.props.unit;

      return _react2.default.createElement(
        _components.ReduxForm,
        {
          subStore: 'unit_reclassify',
          submitEndpoint: '/api/units/reclassify',
          submitMethod: 'PATCH'
        },
        _react2.default.createElement(_components.ClassSelect, { unitType: unit.unit_type, scholastic: unit.organization.is_school }),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-success btn-block' },
          'Change Class'
        )
      );
    }
  }]);

  return Reclassify;
}(_react2.default.Component);