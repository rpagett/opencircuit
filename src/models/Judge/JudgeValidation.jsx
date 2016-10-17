import Indicative from 'indicative';
import Moment from 'moment';

export default function validateJudge(data = { }) {
  const rules = {
    'email': 'required|email',
    'first_name': ['required', 'regex:^[a-zA-Z.\s]+$'],
    'middle_initial': 'max:1',
    'last_name': ['required', 'regex:^[a-zA-Z\-\s]+$'],
    'phone': ['required', 'min:10', 'max:16', 'regex:^[^_]+$'],
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  let sanitation = {
    'first_name': 'capitalize',
    'last_name': 'title',
    'city': 'title',
  }

  if (data.middle_initial) {
    sanitation['middle_initial'] = 'capitalize';
  }

  if (data.dob) {
    data.dob = Moment(data.dob).format('MMM. Do, YYYY')
  }

  if (!data.friday_departure) {
    data.friday_departure = 0;
  }
  if (!data.sunday_departure) {
    data.sunday_departure = 0;
  }

  const messages = {
    'required': 'This field is required.',
    'first_name.regex': 'Your first name may only contain letters and spaces.',
    'last_name.regex': 'Your last name may only contain letters, spaces, and dashes.',
    'phone.regex': 'Phone numbers must follow a (555) 555 - 5555 format.',
    'phone.min': 'Phone numbers must follow a (555) 555 - 5555 format.',
    'phone.max': 'Phone numbers must follow a (555) 555 - 5555 format.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  return Indicative.validateAll(data, rules, messages)
    .then(data => {
      return Indicative.sanitize(data, sanitation);
    })
}
