const getFormattedDate = (date, format = 'en-UK', extraOptions = {}) => {
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',

    ...extraOptions,
  };
  return date
    ? new Date(date).toLocaleDateString(format, options).split(',').join('')
    : '';
};

function getFormattedTime(date) {
  const toDate = new Date(date);
  const hour = toDate.getHours(),
    minutes = toDate.getMinutes();
  const timeString = `${hour > 9 ? hour : '0' + hour}:${
    minutes > 9 ? minutes : '0' + minutes
  }`;
  return date ? timeString : '';
}

function getFormattedDateTime(date) {
  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  return date ? new Date(date).toLocaleDateString('en-UK', options) : '';
}

function getDayDiff(date1, date2) {
  const timeDifference = new Date(date2) - new Date(date1);

  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

function sortBasedOnProperty(data = [], sortProp, type = 'asc') {
  let sorted = data.sort((a, b) => {
    if (a[sortProp] < b[sortProp]) return type === 'asc' ? -1 : 1;
    if (a[sortProp] > b[sortProp]) return type === 'asc' ? 1 : -1;
    return 0;
  });
  console.log(sorted);
  return sorted;
}

export {
  getFormattedDate,
  getFormattedTime,
  getFormattedDateTime,
  getDayDiff,
  sortBasedOnProperty,
};
