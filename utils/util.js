const formatDate = (date, format='') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  if (format === 'YYYY-MM-DD') {
    return year + '-' + formatNumber(month) + '-' + formatNumber(day);
  }

  return year + '-' + formatNumber(month) + '-' + formatNumber(day) + ' ' + formatNumber(hour) + ':' + formatNumber(minute) + ':' + formatNumber(second);
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatDate: formatDate
}
