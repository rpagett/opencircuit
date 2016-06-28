export function updateField(formStore, field, value) {
  return {
    type: 'FORM_UPDATE_FIELD_VALUE',
    formStore,
    field,
    value
  }
}