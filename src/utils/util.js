export const formateSeconds = (s) => {
  if (s > 0) {
    let hour = Math.floor(s / 3600)
    let min = Math.floor(s / 60) % 60
    let sec = s % 60
    hour = hour >= 10 ? hour : '0' + hour
    min = min >= 10 ? min : '0' + min
    sec = sec >= 10 ? sec : '0' + sec
    return hour > 0 ? hour + ":" + min + ":" + sec : min + ":" + sec
  } else {
    return '00:00'
  }
}