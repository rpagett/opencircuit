import Indicative from 'indicative';

export default function validateOrganization(data = { }) {
  const rules = {
    'name': 'required',
    'street': 'required',
    'city': 'required',
    'state': 'required|min:2|max:2|alpha',
    'zip': ['required', 'regex:^[0-9]{5}$'],
    'director': 'required'
  };

  const messages = {
    'required': 'This field is required.',
    'zip.regex': 'Please supply a 5-digit ZIP.'
  };

  data.name = data.name.replace(/middle school/i, 'MS');
  data.name = data.name.replace(/high school/i, 'HS');

  if (!data.slug) {
    data.slug = Indicative.sanitizor.slug(data.name);
  }

  return Indicative.validateAll(data, rules, messages);
}
