import Indicative from 'indicative';

export function validatePayment(data = { }) {
  const rules = {
    'amount': 'required',
    'payment_type': 'required',
  };

  const messages = {
    'required': 'This field is required.',
  };

  return Indicative.validateAll(data, rules, messages);
}