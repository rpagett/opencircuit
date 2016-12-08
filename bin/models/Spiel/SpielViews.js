'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Edit = exports.Index = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _functions = require('../../helpers/functions');

var _UserRoles = require('../User/UserRoles');

var _ModelView = require('../../helpers/ModelView/ModelView');

var _ModelView2 = _interopRequireDefault(_ModelView);

var _SpielList = require('./SpielList');

var _SpielList2 = _interopRequireDefault(_SpielList);

var _SpielForms = require('./SpielForms');

var SpielForm = _interopRequireWildcard(_SpielForms);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = exports.Index = function (_React$Component) {
  _inherits(Index, _React$Component);

  function Index() {
    _classCallCheck(this, Index);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Index).apply(this, arguments));
  }

  _createClass(Index, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Spiels'
        ),
        _react2.default.createElement(_SpielList2.default, { endpoint: '/api/spiels' })
      );
    }
  }]);

  return Index;
}(_react2.default.Component);

var _Preview = function (_React$Component2) {
  _inherits(_Preview, _React$Component2);

  function _Preview() {
    _classCallCheck(this, _Preview);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_Preview).apply(this, arguments));
  }

  _createClass(_Preview, [{
    key: 'render',
    value: function render() {
      var unit_name = this.props.unit_name ? this.props.unit_name : this.props.name;
      var show_title = this.props.show_title ? this.props.show_title : '(show title)';
      var staff = this.props.directors ? this.props.directors : '(director)';

      if (this.props.isLoading) {
        return _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'strong',
            null,
            _react2.default.createElement(
              'h4',
              null,
              'Loading preview...'
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'offset-xs-1 col-xs-10' },
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h6',
            null,
            '(When unit crosses timeline)'
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h5',
            null,
            'Ladies and Gentlemen, please welcome from',
            _react2.default.createElement(
              'strong',
              null,
              ' ',
              this.props.city,
              ', ',
              this.props.state
            ),
            ','
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h3',
            null,
            unit_name
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h6',
            null,
            '(at 1:30 of the interval time, or at the direction of the timing official)'
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Performing their program, "',
            show_title,
            '",'
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'strong',
            null,
            _react2.default.createElement(
              'h3',
              null,
              unit_name
            )
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'You may take the floor in competition!'
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'strong',
            null,
            _react2.default.createElement(
              'h6',
              null,
              '( At the obvious conclusion of the program: )'
            )
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Ladies and gentlemen, ',
            _react2.default.createElement(
              'strong',
              null,
              unit_name
            ),
            ', under the direction of ',
            _react2.default.createElement(
              'strong',
              null,
              staff
            ),
            '!'
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h4',
            null,
            _react2.default.createElement(
              'strong',
              null,
              unit_name
            ),
            ' hopes you enjoyed their program, entitled "',
            show_title,
            '".'
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h4',
            null,
            'Hailing from ',
            _react2.default.createElement(
              'strong',
              null,
              this.props.city,
              ', ',
              this.props.state
            ),
            ','
          )
        ),
        _react2.default.createElement(
          'center',
          null,
          _react2.default.createElement(
            'h2',
            null,
            _react2.default.createElement(
              'strong',
              null,
              unit_name
            )
          )
        )
      );
    }
  }]);

  return _Preview;
}(_react2.default.Component);

var mapStateToPreviewProps = function mapStateToPreviewProps(state) {
  return {
    name: state.form['spiel_edit'] && state.form['spiel_edit'].name,
    city: state.form['spiel_edit'] && state.form['spiel_edit'].city,
    state: state.form['spiel_edit'] && state.form['spiel_edit'].state,
    unit_name: state.form['spiel_edit'] && state.form['spiel_edit'].unit_name,
    show_title: state.form['spiel_edit'] && state.form['spiel_edit'].show_title,
    directors: state.form['spiel_edit'] && state.form['spiel_edit'].directors,
    isLoading: state.form.loading['spiel_edit']
  };
};

var Preview = (0, _reactRedux.connect)(mapStateToPreviewProps, {})(_Preview);

var Edit = exports.Edit = function (_React$Component3) {
  _inherits(Edit, _React$Component3);

  function Edit() {
    _classCallCheck(this, Edit);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Edit).apply(this, arguments));
  }

  _createClass(Edit, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        _react2.default.createElement(
          'h1',
          { className: 'page-header' },
          'Editing Spiel'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'offset-xs-1 col-xs-10' },
            _react2.default.createElement(SpielForm.Edit, { slug: this.props.params.slug })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement('p', null),
          _react2.default.createElement('hr', null),
          _react2.default.createElement('p', null)
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(Preview, null)
        )
      );
    }
  }]);

  return Edit;
}(_react2.default.Component);