const validate = require('../utils/validate')
const { app } = require('../utils/joiSchema')
const { dealBody, tranTime } = require('../utils/tools')
const {
  findAppListByName,
  findAppCountByName,
  findAppByName,
  insertApp,
  findAppDetailById,
  deleteAppById,
  updateApp
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
  },
  // 详情
  async getDetail(ctx) {
    const { id } = ctx.query

    // 查询
    const daoDetail = await findAppDetailById(id)
    if (!daoDetail) {
      throw new Error('该 id 不存在！')
    }
    const jsonDetail = daoDetail.toJSON()

    return ctx.body = dealBody({
      data: jsonDetail
    })
  },
  // 删除
  async postDetele(ctx) {
    const { id } = ctx.request.body
    
    // 删除
    await deleteAppById(id)
    
    return ctx.body = dealBody({
      message: '删除成功'
    })
  },
  // 修改
  async postModify(ctx) {
    let { id, name } = ctx.request.body
    name = name.trim()

    // 校验
    validate({ name }, app)
    if (typeof id === 'undefined') {
      throw new Error('id 不能为空！')
    }
    
    // 更新
    let daoApp = await updateApp({ 
      id, 
      name, 
      gmtModified: tranTime(new Date(), 'timestamp-mysql') 
    }) 
    let jsonApp = daoApp.toJSON()
    
    return ctx.body = dealBody({
      data: jsonApp,
      message: '修改成功'
    })
  }
}