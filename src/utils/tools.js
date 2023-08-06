const getFormattedDate = (date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return new Date(date)
    .toLocaleDateString('en-UK', options)
    .split(',')
    .join('');
};

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

  return date.toLocaleDateString('en-UK', options);
}

export { getFormattedDate, getFormattedDateTime };
