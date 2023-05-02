import moment from 'moment';

export const findDueDate = dueDate => {
  let dateOne = moment(dueDate);
  let dateTwo = moment();

  let result = dateOne.diff(dateTwo, 'days');

  return result === 0
    ? 'Today'
    : result === 1
    ? 'Tomorrow'
    : result === -1
    ? 'Yesterday'
    : dateOne?.format('DD MMM YY');
};
