'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactRouter = require('react-router');

var _FlexTable = require('../../helpers/FlexTable/FlexTable');

var _FlexTable2 = _interopRequireDefault(_FlexTable);

var _UserRoles = require('../User/UserRoles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileList = function (_React$Component) {
  _inherits(FileList, _React$Component);

  function FileList() {
    _classCallCheck(this, FileList);

    return _possibleConstructorReturn(this, (FileList.__proto__ || Object.getPrototypeOf(FileList)).apply(this, arguments));
  }

  _createClass(FileList, [{
    key: 'canDelete',
    value: function canDelete(file, authUser) {
      if ((0, _UserRoles.userHasRole)(authUser, _UserRoles.UserRoles.Administrator)) {
        return '/api/files/' + file.system_filename;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_FlexTable2.default, {
          name: 'fileList',
          endpoint: this.props.endpoint,
          emptyMessage: 'There are no public files.',
          columns: {
            'File': function File(file) {
              return _react2.default.createElement(
                'a',
                { href: file.userUrl, target: '_blank' },
                file.user_filename
              );
            },
            'Uploaded': function Uploaded(file) {
              return file.formattedCreationDate;
            },
            'By': function By(file) {
              return file.uploader.formattedName;
            }
          },
          deriveName: function deriveName(file) {
            return file.user_filename;
          },
          canDelete: this.canDelete
        })
      );
    }
  }]);

  return FileList;
}(_react2.default.Component);

exports.default = FileList;
;
module.exports = exports['default'];