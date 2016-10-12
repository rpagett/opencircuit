'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Upload = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _LoadingCube = require('../../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Upload = exports.Upload = function (_React$Component) {
  _inherits(Upload, _React$Component);

  function Upload() {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Upload).call(this));

    _this.state = {
      isLoading: false
    };
    return _this;
  }

  _createClass(Upload, [{
    key: 'updateText',
    value: function updateText(e) {
      this.setState({
        filename: e.target.value
      });
    }

    //onDrop(files) {
  }, {
    key: 'onSubmit',
    value: function onSubmit(e) {
      var _this2 = this;

      e && e.preventDefault();
      this.setState({ isLoading: true });

      var data = new FormData();
      data.append('file', this._file.files[0]);
      data.append('filename', this.state.filename);

      var boundaryKey = Math.floor(Math.random() * 1E16);
      (0, _isomorphicFetch2.default)('/api/files', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Authorization': this.props.user.apiToken
        },
        body: data
      }).then(function (res) {
        _this2.setState({ isLoading: false });
        return res.json();
      }).then(function (res) {
        if (res.success == true) {
          _this2.props.markClosed();
        } else {
          console.log(res.error);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (this.state.isLoading) {
        return _react2.default.createElement(_LoadingCube2.default, { show: true });
      }

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'strong',
            null,
            'File Name for Users'
          )
        ),
        _react2.default.createElement(
          'form',
          { enctype: 'multipart/form-data', ref: 'uploadForm' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('input', {
              name: 'filename',
              className: 'form-control',
              type: 'text',
              onChange: this.updateText.bind(this)
            }),
            _react2.default.createElement('p', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('input', {
              className: 'form-control',
              type: 'file',
              name: 'upload',
              ref: function ref(c) {
                return _this3._file = c;
              } }),
            _react2.default.createElement('p', null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'button',
              {
                type: 'submit',
                role: 'submit',
                onClick: this.onSubmit.bind(this),
                className: 'btn btn-success btn-block'
              },
              'Upload'
            ),
            _react2.default.createElement('p', null)
          )
        )
      );
    }
  }]);

  return Upload;
}(_react2.default.Component);