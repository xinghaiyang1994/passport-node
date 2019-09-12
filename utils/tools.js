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
  }
}
