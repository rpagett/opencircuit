import Indicative from 'indicative';

export default function validateCompClass(data = { }) {
  const rules = {
    'name': 'required',
    'abbreviation': 'required|alpha',
  };

  const messages = {
    'required': 'This field is required.',
  };

  data.abbreviation = data.abbreviation.toLowerCase();

  return Indicative.validateAll(data, rules, messages);
}
