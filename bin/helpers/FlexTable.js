'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _FlexTable = (_temp = _class = function (_React$Component) {
  _inherits(_FlexTable, _React$Component);

  function _FlexTable() {
    _classCallCheck(this, _FlexTable);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(_FlexTable).apply(this, arguments));
  }

  _createClass(_FlexTable, [{
    key: 'render',
    value: function render() {
      var columns = this.props.columns;

      if (!this.props.contents) {
        return _react2.default.createElement(
          'strong',
          null,
          this.props.emptyMessage,
          ' '
        );
      }

      var header = [];
      for (var key in columns) {
        header.push(_react2.default.createElement(
          'th',
          { key: key },
          key
        ));
      }

      return _react2.default.createElement(
        'div',
        null,
        this.props.title ? _react2.default.createElement(
          'h3',
          null,
          this.props.title
        ) : '',
        _react2.default.createElement(
          'table',
          { className: 'flex-table table table-striped table-hover' },
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              header
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            this.props.contents.map(function (line) {
              var cells = [];

              for (var _key in columns) {
                cells.push(_react2.default.createElement(
                  'td',
                  { key: line._id + '-' + _key, 'data-title': _key },
                  columns[_key](line)
                ));
              }

              return _react2.default.createElement(
                'tr',
                { key: line._id },
                cells
              );
            })
          )
        )
      );
    }
  }]);

  return _FlexTable;
}(_react2.default.Component), _class.propTypes = {
  columns: _react2.default.PropTypes.object.isRequired,
  emptyMessage: _react2.default.PropTypes.string.isRequired,
  endpoint: _react2.default.PropTypes.string.isRequired,
  isLoading: _react2.default.PropTypes.bool,
  title: _react2.default.PropTypes.string
}, _class.defaultProps = {
  isLoading: true
}, _temp);

var mapStateToProps = function mapStateToProps(state) {
  return {
    isLoading: state.flexTable.isLoading,
    error: state.flexTable.error,
    contents: state.flexTable.contents
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    fetchContents: function fetchContents() {
      dispatch(FlexTableActions.fetch(props.endpoint));
    },

    feedDispatch: function feedDispatch() {
      return dispatch;
    }
  };
};

var FlexTable = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_FlexTable);
exports.default = FlexTable;