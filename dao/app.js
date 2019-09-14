const App = require('../models/app')

module.exports = {
  // 列表.翻页,根据 name 模糊查询
  findAppListByName({ name, page, pageSize}) {
    return App.forge().where('name', 'like', `%${name}%`).fetchPage({ page, pageSize })
  },
  // 统计个数.根据 name 模糊查询
  findAppCountByName(name) {
    return App.forge().where('name', 'like', `%${name}%`).count()
  },
  // 查询单个详情
  findAppByName(name) {
    return App.forge().where({ name }).fetch()
  },
  // 新增单个
  insertApp({ name }) {
    return App.forge({ name }).save()
  },
  // 新增单个
  findAppDetailById(id) {
    return App.forge({ id }).fetch()
  },
  // 新增单个
  deleteAppById(id) {
    return App.forge({ id }).destroy({ require: false })
  },
  // 新增单个
  updateApp({ id, name, gmtModified }) {
    return App.forge().where({ id }).save({ name, gmtModified }, { method: 'update' })
  }
}
