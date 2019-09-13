const Router = require('koa-router')
const { checkAdmin } = require('../middlewares/check')

module.exports = function (app) {

  const router = new Router()

  // 用户相关
  router.use('/user', require('./user').routes())
  
  // 应用相关
  router.use('/app', async (ctx, next) => {
    // 检查是否是管理员(包含检查登录)
    let adminData = checkAdmin(ctx)
    if (!adminData.status) {
      return ctx.body = adminData.data
    }
    
    await next()
  }, require('./app').routes())

  app.use(router.routes())
  app.use(router.allowedMethods())

}