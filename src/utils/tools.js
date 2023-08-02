const getFormattedDate = (date) => {
  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return new Date(date)
    .toLocaleDateString('en-UK', options)
    .split(',')
    .join('');
};

export { getFormattedDate };
