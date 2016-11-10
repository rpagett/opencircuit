import Indicative from 'indicative';
import Moment from 'moment';

export default function validateForm(data = { }) {
  const rules = {
    'name': 'required',
    'description': 'required'
  };

  const messages = {
    'required': 'This field is required.',
  };

  return Indicative.validateAll(data, rules, messages)
}
