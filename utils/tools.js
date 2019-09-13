const crypto = require('crypto')

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
  tranTime(time) {
    let date = new Date(time)
    if (date.toString() === 'Invalid Date') {
      return ''
    }
    // 默认返回时间戳
    return date.getTime()
  }
}
