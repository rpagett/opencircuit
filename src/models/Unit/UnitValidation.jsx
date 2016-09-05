import Indicative from 'indicative';

export default function validateUnit(data = { }) {
  const rules = {
    'name': 'required',
    'members': 'integer|min:5'
  };

  const messages = {
    'required': 'This field is required.',
  };

  if (!data.slug) {
    data.slug = Indicative.sanitizor.slug(data.name);
  }

  data.name = data.name.replace(/middle school/i, 'MS');
  data.name = data.name.replace(/high school/i, 'HS');

  return Indicative.validateAll(data, rules, messages);
}
