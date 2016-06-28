'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateField = updateField;
function updateField(formStore, field, value) {
  return {
    type: 'FORM_UPDATE_FIELD_VALUE',
    formStore: formStore,
    field: field,
    value: value
  };
}