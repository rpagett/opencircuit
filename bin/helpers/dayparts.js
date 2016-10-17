'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TranslateDaypart;
var DaypartLabels = exports.DaypartLabels = {
  '0': 'No Preference',
  '1': 'Early Morning (6a - 9a)',
  '2': 'Morning (9a - 12p)',
  '3': 'Afternoon (12p - 3p)',
  '4': 'Late Afternoon (3p - 6p)',
  '5': 'Evening (6p - 9p)',
  '6': 'Late Night (9p - 12a)'
};

function TranslateDaypart(dp) {
  return DaypartLabels[dp] || 'error';
}