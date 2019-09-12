const Router = require('koa-router')

module.exports = function (app) {

  const router = new Router()

  // 子路由
  // 用户相关
  router.use('/user', require('./user').routes())

  app.use(router.routes())
  app.use(router.allowedMethods())

}