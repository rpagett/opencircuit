"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translateValidationErrors = translateValidationErrors;
function translateValidationErrors(errors) {
  /*
    We want to translate
      [
        {field: <field>, message: <message>}, ...
      ]
       to
       {
        <field>: <message>
      }
  */

  var messages = {};
  for (var index in errors) {
    var line = errors[index];
    messages[line.field] = line.message;
  }

  return messages;
}