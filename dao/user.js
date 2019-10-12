const User = require('../models/user')

module.exports = {
  // 查询单个用户详情
  findUserByName(name) {
    return User.forge().where({ name }).fetch({ require: false })
  },
  // 新增用户
  insertUser({ name, password }) {
    return User.forge({ name, password }).save()
  }
}
