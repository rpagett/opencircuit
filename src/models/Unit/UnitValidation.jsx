import Indicative from 'indicative';

export default function validateUnit(data = { }) {
  const rules = {
    'name': 'required',
    'members': 'integer|min:5'
  };

  const messages = {
    'required': 'This field is required.',
  };

  data.name = data.name.replace(/middle school/i, 'MS');
  data.name = data.name.replace(/high school/i, 'HS');

  if (!data.slug) {
    data.slug = Indicative.sanitizor.slug(data.name);
  }

  return Indicative.validateAll(data, rules, messages);
}
