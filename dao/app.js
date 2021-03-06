const App = require('../models/app')

module.exports = {
  // 列表.翻页,根据 name 模糊查询
  findAppListByName({ name, code, page, pageSize}) {
    return App.forge().query(knex => {
      knex.where('name', 'like', `%${name}%`)
      knex.where('code', 'like', `%${code}%`)
    }).where('code', 'like', `%${code}%`).fetchPage({ page, pageSize })
  },
  // 统计个数.根据 name 模糊查询
  findAppCountByName(name, code) {
    return App.forge().query(knex => {
      knex.where('name', 'like', `%${name}%`)
      knex.where('code', 'like', `%${code}%`)
    }).count()
  },
  // 查询单个详情
  findAppByCode(code) {
    return App.forge().where({ code }).fetch({ require: false })
  },
  // 新增单个
  insertApp({ name, code }) {
    return App.forge({ name, code }).save()
  },
  // 查询单个详情
  findAppDetailById(id) {
    return App.forge({ id }).fetch({ require: false })
  },
  // 删除单个
  deleteAppById(id) {
    return App.forge({ id }).destroy({ require: false })
  },
  // 更新单个
  updateApp({ id, name, code, gmtModified }) {
    return App.forge().where({ id }).save({ name, code, gmtModified }, { method: 'update' })
  }
}
