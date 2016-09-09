import Indicative from 'indicative';

export function organization(data = { }) {
  const rules = {
    'is_school': 'required',
    'name': 'required',
    'street': 'required',
    'city': 'required',
    'state': 'required',
    'zip': ['required', 'regex:^[0-9]{5}$']
  };

  const messages = {
    'required': 'This field is required.',
    'zip.regex': 'Please supply a 5-digit ZIP code.'
  };

  if (!data.slug) {
    data.slug = Indicative.sanitizor.slug(data.name);
  }

  return Indicative.validateAll(data, rules, messages);
}

export function unit(data = { }) {
  const rules = {
    'unit_type': 'required',
    'name': 'required'
  };

  const messages = {
    'required': 'This field is required.',
  };

  if (!data.slug) {
    data.slug = Indicative.sanitizor.slug(data.name);
  }

  return Indicative.validateAll(data, rules, messages);
}

export function unitDetails(data = { }) {
  const rules = {
    'competition_class': 'required'
  };

  const messages = {
    'required': 'This field is required.',
  };

  return Indicative.validateAll(data, rules, messages);
}
