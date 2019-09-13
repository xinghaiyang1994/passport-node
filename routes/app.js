const Router = require('koa-router')
const router = new Router()

// 列表
router.get('/list', require('../controller/app').getList)
// 新增
router.post('/add', require('../controller/app').postAdd)

module.exports = router
