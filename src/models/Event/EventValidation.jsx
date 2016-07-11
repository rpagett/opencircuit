import Indicative from 'indicative';

export default function validateEvent(data = { }) {
  const rules = {
    'name': 'required',
    'date': 'required'
  };

  const messages = {
    'required': 'This field is required.',
  };

  if (!data.slug) {
    data.slug = Indicative.sanitizor.slug(data.name);
  }

  return Indicative.validateAll(data, rules, messages);
}
