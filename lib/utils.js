function pad(str, len = 2) {
  return String(str).padStart(len, '0')
}

module.exports = {
  pad
}
