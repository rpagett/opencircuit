'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _LoadingCube = require('../LoadingCube');

var _LoadingCube2 = _interopRequireDefault(_LoadingCube);

var _SpawnableModal = require('../../modals/SpawnableModal');

var _FlexTableActions = require('./FlexTableActions');

var FlexTableActions = _interopRequireWildcard(_FlexTableActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.dumpContents();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.fedContents) {
        this.props.preloadContents();
      } else {
        this.props.fetchContents();
      }
    }
  }, {
    key: 'editButton',
    value: function editButton(route) {
      return _react2.default.createElement(
        _reactRouter.Link,
        { to: route, key: route + '-edit' },
        _react2.default.createElement(_Icon2.default, { shape: 'pencil' })
      );
    }
  }, {
    key: 'deleteButton',
    value: function deleteButton(route, name) {
      return _react2.default.createElement(_SpawnableModal.LaunchModalButton, {
        className: 'btn-link',
        buttonText: _react2.default.createElement(_Icon2.default, { shape: 'trash' }),
        key: route + '-delete',

        title: 'Confirm Deletion',
        componentName: 'FLEXTABLE_CONFIRM_DELETION',
        modalProps: {
          name: name,
          endpoint: route,
          refreshTable: this.props.name,
          refreshEndpoint: this.props.endpoint
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      console.log('Rendering');
      var showOptionsColumn = false;
      var tryEdit = false;
      var tryDelete = false;

      if (this.props.canEdit) {
        tryEdit = true;
      }
      if (this.props.canDelete) {
        tryDelete = true;
      }

      if (this.props.isLoading && !this.props.contents) {
        return _react2.default.createElement(_LoadingCube2.default, { show: true });
      }

      if (this.props.error) {
        return _react2.default.createElement(
          'strong',
          null,
          'There was an error: ',
          this.props.error,
          '.'
        );
      }

      if (!this.props.contents || !this.props.contents.length) {
        return _react2.default.createElement(
          'strong',
          null,
          this.props.emptyMessage
        );
      }

      var columns = this.props.columns;

      var header = [];
      for (var key in columns) {
        header.push(_react2.default.createElement(
          'th',
          { key: key },
          key
        ));
      }

      var contents = [];
      this.props.contents.map(function (line) {
        var cells = [];

        var editRoute = null;
        if (tryEdit) {
          editRoute = _this2.props.canEdit(line, _this2.props.authUser);
        }

        var deleteRoute = null;
        if (tryDelete) {
          deleteRoute = _this2.props.canDelete(line, _this2.props.authUser);
        }

        for (var _key in columns) {
          cells.push(_react2.default.createElement(
            'td',
            { key: line._id + '-' + _key, 'data-title': _key },
            columns[_key](line, _this2.props.feedDispatch())
          ));
        }

        if (editRoute || deleteRoute) {
          cells.push(_react2.default.createElement(
            'td',
            { key: line._id + '-opts', 'data-title': 'Options' },
            editRoute ? _this2.editButton(editRoute) : null,
            deleteRoute ? _this2.deleteButton(deleteRoute, _this2.props.deriveName(line)) : null
          ));

          showOptionsColumn = true;
        }

        contents.push(_react2.default.createElement(
          'tr',
          { key: line._id + Math.random() },
          cells
        ));
      });

      if (showOptionsColumn) {
        header.push(_react2.default.createElement(
          'th',
          null,
          'Options'
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
            contents
          )
        )
      );
    }
  }]);

  return _FlexTable;
}(_react2.default.Component), _class.propTypes = {
  columns: _react2.default.PropTypes.object.isRequired,
  emptyMessage: _react2.default.PropTypes.string.isRequired,
  endpoint: _react2.default.PropTypes.string,
  isLoading: _react2.default.PropTypes.bool,
  title: _react2.default.PropTypes.string,

  canEdit: _react2.default.PropTypes.func,
  canDelete: _react2.default.PropTypes.func,
  deriveName: _react2.default.PropTypes.func
}, _class.defaultProps = {
  isLoading: true
}, _temp);

var mapStateToProps = function mapStateToProps(state, props) {
  return {
    isLoading: state.flexTable.isLoading,
    error: state.flexTable.error,
    contents: state.flexTable[props.name],
    authUser: state.auth.user
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
  return {
    fetchContents: function fetchContents() {
      dispatch(FlexTableActions.fetchContents(props.name, props.endpoint));
    },

    preloadContents: function preloadContents() {
      dispatch(FlexTableActions.receivedContents(props.name, props.fedContents));
    },

    dumpContents: function dumpContents() {
      dispatch(FlexTableActions.dumpContents(props.name));
    },

    feedDispatch: function feedDispatch() {
      return dispatch;
    },

    setLoading: function setLoading() {
      dispatch(FlexTableActions.beginLoading(props.endpoint));
    }
  };
};

var FlexTable = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_FlexTable);
exports.default = FlexTable;
module.exports = exports['default'];