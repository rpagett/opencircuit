'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _components = require('../../forms/components');

var _ContentsView = require('../../helpers/ContentsView/ContentsView');

var _ContentsView2 = _interopRequireDefault(_ContentsView);

var _ComponentFlowActions = require('../../helpers/ComponentFlow/ComponentFlowActions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formProps = {
  subStore: 'unit_registration',
  submitEndpoint: '/api/units',
  submitMethod: 'POST'
};

var _UnitTypes = function _UnitTypes(props) {
  var options = [];
  props.contents.map(function (type) {
    options.push(_react2.default.createElement(_components.Radio, {
      label: type.name,
      key: type._id,
      name: 'unit_type',
      value: type._id
    }));
  });

  return _react2.default.createElement(
    _components.ReduxForm,
    formProps,
    options
  );
};

var views = {
  'root': function root() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'lead' },
        'Let\'s start with your team\'s parent organization.'
      ),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        'p',
        null,
        'I represent:'
      ),
      _react2.default.createElement(
        _components.ReduxForm,
        formProps,
        _react2.default.createElement(_components.Radio, {
          label: 'A middle or high school.',
          name: 'scholastic',
          value: 'true'
        }),
        _react2.default.createElement(_components.Radio, {
          label: 'A university or independent performance group.',
          name: 'scholastic',
          value: 'false'
        })
      )
    );
  },

  'organization-details': function organizationDetails() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'lead' },
        'Now some details. These should be about your ',
        _react2.default.createElement(
          'strong',
          null,
          'school or independent non-profit'
        ),
        ', not about the team itself.'
      ),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        _components.ReduxForm,
        formProps,
        _react2.default.createElement(_components.FormInput, { name: 'organization.name', label: 'Organization Name' }),
        _react2.default.createElement(_components.FormInput, { name: 'organization.street', label: 'Street' }),
        _react2.default.createElement(_components.FormInput, { name: 'organization.city', label: 'City' }),
        _react2.default.createElement(_components.StateSelect, { name: 'organization.state', label: 'State' }),
        _react2.default.createElement(_components.FormInput, { name: 'organization.zip', label: 'ZIP' })
      )
    );
  },

  'unit-type': function unitType() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'lead' },
        'Now it\'s time to focus on a team.'
      ),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        'p',
        null,
        'This unit is:'
      ),
      _react2.default.createElement(_ContentsView2.default, { subStore: 'register_unit_types', endpoint: '/api/unittypes', component: _UnitTypes })
    );
  },

  'unit-details': function unitDetails(props) {
    var state = props.formState[formProps.subStore];

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'p',
        { className: 'lead' },
        'Now it\'s time to focus on a team.'
      ),
      _react2.default.createElement('hr', null),
      _react2.default.createElement(
        _components.ReduxForm,
        formProps,
        _react2.default.createElement(_components.FormInput, { name: 'unit.name', label: 'Unit Name' }),
        _react2.default.createElement(_components.ClassSelect, { name: 'unit.compclass', label: 'Class', unitType: state.unit_type }),
        _react2.default.createElement(_components.FormInput, { name: 'unit.members', label: 'Members' })
      )
    );
  }
};

function fieldsEmpty(state) {
  var fields = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

  for (var key in fields) {
    if (state[fields[key]] === null) {
      return true;
    }
  }

  return false;
}

var actions = {
  'root': function root(dispatch, getState) {
    var state = getState().form[formProps.subStore];
    if (state.scholastic === null) {
      return;
    }

    dispatch((0, _ComponentFlowActions.setView)('organization-details'));
  },

  'organization-details': function organizationDetails(dispatch, getState) {
    var state = getState().form[formProps.subStore];
    if (fieldsEmpty(state, ['organization.name', 'organization.street', 'organization.city', 'organization.state', 'organization.zip'])) {
      return;
    }

    // TODO: add fuzzy search of existing organizations
    dispatch((0, _ComponentFlowActions.setView)('unit-type'));
  },

  'unit-type': function unitType(dispatch, getState) {
    var state = getState().form[formProps.subStore];
    if (state.unit_type === null) {
      return;
    }

    dispatch((0, _ComponentFlowActions.setView)('unit-details'));
  },

  'unit-details': function unitDetails(dispatch) {
    alert('Yep');
  }
};

var flow = {
  'root': {
    component: views['root'],
    buttonAction: actions['root']
  },
  'organization-details': {
    component: views['organization-details'],
    buttonAction: actions['organization-details']
  },
  'unit-type': {
    component: views['unit-type'],
    buttonAction: actions['unit-type']
  },
  'unit-details': {
    component: views['unit-details'],
    buttonAction: actions['unit-details']
  }
};

exports.default = flow;