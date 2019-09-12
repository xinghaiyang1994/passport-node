const { dealBody } = require('../utils/tools')
module.exports = {
  // 检查是否登录
  checkLogin(ctx) {
    let res = {
      status: true,
      data: ''
    }
    if (!ctx.session.user) {
      res.status = false
      res.data = dealBody({
        code: -2,
        message: '用户未登录，请登录后再试！'
      })
    }
    return res
  }
}