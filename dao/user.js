const User = require('../models/user')

module.exports = {
  // 查询单个用户详情
  findUserByName(name) {
    return User.forge().where({ name: name }).fetch()
  },
  // 新增用户
  insertUser({ name, password }) {
    return User.forge({ name, password }).save()
  },

  // 查询单个用户详情
  findUserById(id) {
    return User.forge().where({
      id: id
    }).fetch()
  }
}
