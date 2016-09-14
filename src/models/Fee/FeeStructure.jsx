import _ from 'lodash';

const FeeStructure = [475, 425, 400, 375, 350];

export default function determineFeeStructure(count) {
  if (FeeStructure[count-1]) {
    return FeeStructure[count-1];
  }

  return _.last(FeeStructure);
}