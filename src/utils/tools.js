const getFormattedDate = (date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return date
    ? new Date(date).toLocaleDateString('en-UK', options).split(',').join('')
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

export { getFormattedDate, getFormattedTime, getFormattedDateTime };
