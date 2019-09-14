const validate = require('../utils/validate')
const { app } = require('../utils/joiSchema')
const { dealBody, tranTime } = require('../utils/tools')
const {
  findAppListByName,
  findAppCountByName,
  findAppByCode,
  insertApp,
  findAppDetailById,
  deleteAppById,
  updateApp
} = require('../dao/app')

module.exports = {
  // 列表(翻页)
  async getList(ctx) {
    let { name = '', code = '', page = 1, pageSize = 10 } = ctx.query

    // 查询列表及总数
    const daoList = await findAppListByName({ name, code, page, pageSize})
    const jsonList = daoList.toJSON()
    jsonList.forEach(el => {
      el.gmtCreate = tranTime(el.gmtCreate)
      el.gmtModified = tranTime(el.gmtModified)
    })
    const count = await findAppCountByName(name, code)

    return ctx.body = dealBody({
      data: {
        list: jsonList,
        total: count
      }
    })
  },
  // 新增
  async postAdd(ctx) {
    let { name, code } = ctx.request.body
    name = name.trim()
    code = code.trim()

    // 校验
    validate({ name, code }, app)
    let daoApp = await findAppByCode(code) 
    if (daoApp) {
      throw new Error('唯一标识已存在！')
    }

    // 新增单个
    let daoNewApp = await insertApp({ name, code })
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
    let { id, name, code } = ctx.request.body
    name = name.trim()
    code = code.trim()

    // 校验
    validate({ name, code }, app)
    if (typeof id === 'undefined') {
      throw new Error('id 不能为空！')
    }
    let daoApp = await findAppByCode(code) 
    if (daoApp) {
      throw new Error('唯一标识已存在！')
    }
    
    // 更新
    let daoUpdateApp = await updateApp({ 
      id, 
      name, 
      code,
      gmtModified: tranTime(new Date(), 'timestamp-mysql') 
    }) 
    let jsonUpdateApp = daoUpdateApp.toJSON()
    
    return ctx.body = dealBody({
      data: jsonUpdateApp,
      message: '修改成功'
    })
  }
}