'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegisterCritique = exports.RemoveCritique = exports.UploadMusic = exports.Reclassify = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dropbox = require('dropbox');

var _dropbox2 = _interopRequireDefault(_dropbox);

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _components = require('../../forms/components');

var _LoadingCube = require('../../helpers/LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

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
          submitEndpoint: '/api/units/' + unit._id + '/reclassify',
          submitMethod: 'PATCH',
          inModal: true
        },
        _react2.default.createElement(_components.ClassSelect, {
          name: 'compclass',
          unitType: unit.unit_type._id,
          scholastic: unit.organization.is_school
        }),
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

var UploadMusic = exports.UploadMusic = function (_React$Component2) {
  _inherits(UploadMusic, _React$Component2);

  function UploadMusic() {
    _classCallCheck(this, UploadMusic);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(UploadMusic).call(this));

    _this2.state = {
      isLoading: false
    };
    return _this2;
  }

  _createClass(UploadMusic, [{
    key: 'uploadFile',
    value: function uploadFile(e) {
      var _this3 = this;

      function deriveFileExtension(fname) {
        return fname.substr((~-fname.lastIndexOf(".") >>> 0) + 2);
      }

      e && e.preventDefault();
      this.setState({
        isLoading: true,
        uploadMessage: true
      });

      var ACCESS_TOKEN = 'U2Me9Hub8LAAAAAAAAAACNoxSNS_iNDYKb0AVbenYGaKDdOwRL5tKGfXL-mACAEm';
      var dbx = new _dropbox2.default({ accessToken: ACCESS_TOKEN });
      var file = this._file.files[0];

      if (!file) {
        this.setState({
          isLoading: false,
          uploadMessage: false
        });
        return false;
      }

      dbx.filesUpload({ path: '/' + this.props.unit.name + '--' + (0, _moment2.default)(Date.now()).format('MMM-Do-YYYY--h-mm-a') + '.' + deriveFileExtension(file.name), contents: file }).then(function (res) {
        var data = new FormData();
        data.append('modified', res.client_modified);

        return (0, _isomorphicFetch2.default)('/api/units/' + _this3.props.unit.slug + '/music', {
          credentials: 'same-origin',
          method: 'PATCH',
          headers: {
            'Authorization': _this3.props.user.apiToken
          },
          body: data
        });
      }).then(function (res) {
        _this3.setState({
          isLoading: false,
          uploadMessage: false
        });
        return res.json();
      }).then(function (res) {
        if (res.success == true) {
          _this3.props.markClosed();
        } else {
          console.log(res.error);
        }
      }).catch(function (err) {
        console.error(error);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      if (this.state.isLoading) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_LoadingCube2.default, { show: true }),
          this.state.uploadMessage ? _react2.default.createElement(
            'center',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'Uploading...'
            )
          ) : null
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'form',
          { enctype: 'multipart/form-data', ref: 'uploadForm' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement('input', {
              className: 'form-control',
              type: 'file',
              name: 'upload',
              ref: function ref(c) {
                return _this4._file = c;
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
                onClick: this.uploadFile.bind(this),
                className: 'btn btn-success btn-block'
              },
              'Submit'
            ),
            _react2.default.createElement('p', null)
          )
        )
      );
    }
  }]);

  return UploadMusic;
}(_react2.default.Component);

var RemoveCritique = exports.RemoveCritique = function (_React$Component3) {
  _inherits(RemoveCritique, _React$Component3);

  function RemoveCritique() {
    _classCallCheck(this, RemoveCritique);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RemoveCritique).apply(this, arguments));
  }

  _createClass(RemoveCritique, [{
    key: 'render',
    value: function render() {
      var reg = this.props.reg;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'unit_remove_critique',
            submitEndpoint: '/api/units/' + reg.unit.slug + '/critique/' + this.props.event._id,
            submitMethod: 'DELETE',
            inModal: true
          },
          'Are you sure you\'d like to remove ',
          _react2.default.createElement(
            'strong',
            null,
            reg.unit.name
          ),
          ' from critique at',
          _react2.default.createElement(
            'strong',
            null,
            ' ',
            this.props.event.name
          ),
          '?',
          _react2.default.createElement(
            'button',
            { type: 'submit', role: 'submit', className: 'btn btn-danger btn-block' },
            'Confirm'
          )
        )
      );
    }
  }]);

  return RemoveCritique;
}(_react2.default.Component);

var RegisterCritique = exports.RegisterCritique = function (_React$Component4) {
  _inherits(RegisterCritique, _React$Component4);

  function RegisterCritique() {
    _classCallCheck(this, RegisterCritique);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RegisterCritique).apply(this, arguments));
  }

  _createClass(RegisterCritique, [{
    key: 'render',
    value: function render() {
      var reg = this.props.reg;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _components.ReduxForm,
          {
            subStore: 'unit_register_critique',
            submitEndpoint: '/api/units/' + reg.unit.slug + '/critique/' + this.props.event._id,
            submitMethod: 'POST',
            inModal: true
          },
          _react2.default.createElement(
            'p',
            null,
            'Are you sure you\'d like to register ',
            _react2.default.createElement(
              'strong',
              null,
              reg.unit.name
            ),
            ' for critique at',
            _react2.default.createElement(
              'strong',
              null,
              ' ',
              this.props.event.name
            ),
            '?'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Units which register for critique and do not attend the session will be disqualified from critique for the remainder of the competitive season.'
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit', role: 'submit', className: 'btn btn-success btn-block' },
            'Confirm'
          )
        )
      );
    }
  }]);

  return RegisterCritique;
}(_react2.default.Component);