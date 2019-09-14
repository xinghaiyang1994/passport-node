const crypto = require('crypto')

function toD(num) {
  return num < 10 ? '0' + num : '' + num
}

module.exports = {
  // api 统一返回格式
  dealBody(option) {
    return Object.assign({
      code: 0,
      message: '',
      data: ''
    }, option)
  },
  // md5 加密
  md5(value) {
    const hash = crypto.createHash('md5')
    hash.update(value)
    return hash.digest('hex')
  },
  // 时间转换
  tranTime(time, type) {
    let date = new Date(time)
    if (date.toString() === 'Invalid Date') {
      return ''
    }
    // 数据库中的 timestamp
    if (type === 'timestamp-mysql') {
      return date.getFullYear() + '-' + toD(date.getMonth() + 1) + '-' + toD(date.getDate()) + ' ' + date.toTimeString().slice(0, 8)
    }
    // 默认返回时间戳
    return date.getTime()
  }
}
