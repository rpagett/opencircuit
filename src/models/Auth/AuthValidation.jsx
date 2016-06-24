import Indicative from 'indicative';

export function registrationValidation(data = { }) {
  const rules = {
    'email': 'required|email',
    'password': 'required',
    'password_verify': 'required|same:password',
    'first_name': ['required', 'regex:^[a-zA-Z\.\s]+$'],
    'mi': 'max:1',
    'last_name': ['required', 'regex:^[a-zA-Z\-\s]+$'],
    'phone': 'required',
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  const messages = {
    'first_name.regex': 'Your first name may only contain letters and spaces.',
    'last_name.regex': 'Your last name may only contain letters, spaces, and dashes.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  return Indicative.validate(data, rules, messages);
}

export function registrationSanitation(data = { }) {
  const rules = {
    'first_name': 'capitalize',
    'mi': 'capitalize',
    'last_name': 'title',
    'city': 'title',
    'zip': 'toInt'
  }
}