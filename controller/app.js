const validate = require('../utils/validate')
const { app } = require('../utils/joiSchema')
const { dealBody, tranTime } = require('../utils/tools')
const {
  findAppListByName,
  findAppCountByName,
  findAppByName,
  insertApp
} = require('../dao/app')

module.exports = {
  // 获取用户信息
  async getList(ctx) {
    let { name = '', page = 1, pageSize = 10 } = ctx.query

    // 查询列表及总数
    const daoList = await findAppListByName({ name, page, pageSize})
    const jsonList = daoList.toJSON()
    jsonList.forEach(el => {
      el.gmtCreate = tranTime(el.gmtCreate)
      el.gmtModified = tranTime(el.gmtModified)
    })
    const count = await findAppCountByName(name)

    return ctx.body = dealBody({
      data: {
        list: jsonList,
        total: count
      }
    })
  },
  // 新增
  async postAdd(ctx) {
    let { name } = ctx.request.body
    name = name.trim()

    // 校验
    validate({ name }, app)
    let daoApp = await findAppByName(name) 
    if (daoApp) {
      throw new Error('用户名已存在！')
    }

    // 新增单个
    let daoNewApp = await insertApp({ name })
    let jsonNewApp = daoNewApp.toJSON()
    
    return ctx.body = dealBody({
      data: {
        id: jsonNewApp.id
      },
      message: '新增成功'
    })
  }
}