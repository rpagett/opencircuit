export function translateValidationErrors(errors) {
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

  let messages = { };
  for (let index in errors) {
    const line = errors[index];
    messages[line.field] = line.message;
  }

  return messages;
}