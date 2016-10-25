import Indicative from 'indicative';
import Moment from 'moment';

export default function validateForm(data = { }) {
  const rules = {
    'file': 'required',
    'name': ['required', 'regex:^[a-zA-Z.\s]+$'],
    'description': 'required'
  };

  let sanitation = {
    'name': 'capitalize'
  }

  const messages = {
    'required': 'This field is required.',
    'name.regex': 'The name may only contain letters and spaces.'
  };

  return Indicative.validateAll(data, rules, messages)
    .then(data => {
      return Indicative.sanitize(data, sanitation);
    })
}
