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

function isNumeric(value) {
  return /^-?\d+(\.\d+)?$/.test(value);
}

function sortBasedOnProperty(data = [], sortProp, order = 'asc') {
  const sortedData = [...data];
  let aProp, bProp;
  sortedData.sort((a, b) => {
    if (sortProp === 'created_at') {
      aProp = new Date(a[sortProp]);
      bProp = new Date(b[sortProp]);

      if (aProp < bProp) return order === 'asc' ? -1 : 1;
      if (aProp > bProp) return order === 'asc' ? 1 : -1;
      return 0;
    }

    if (sortProp.includes('.')) {
      const aSubProp = a[sortProp.split('.')[0]][sortProp.split('.')[1]];
      const bSubProp = b[sortProp.split('.')[0]][sortProp.split('.')[1]];

      aProp = isNumeric(aSubProp) ? parseFloat(aSubProp) : aSubProp;
      bProp = isNumeric(bSubProp) ? parseFloat(bSubProp) : bSubProp;
    } else {
      aProp = isNumeric(a[sortProp]) ? parseFloat(a[sortProp]) : a[sortProp];
      bProp = isNumeric(b[sortProp]) ? parseFloat(b[sortProp]) : b[sortProp];
    }

    if (aProp < bProp) return order === 'asc' ? -1 : 1;
    if (aProp > bProp) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sortedData;
}

export {
  getFormattedDate,
  getFormattedTime,
  getFormattedDateTime,
  getDayDiff,
  sortBasedOnProperty,
};
