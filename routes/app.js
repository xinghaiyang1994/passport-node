const Router = require('koa-router')
const router = new Router()

// 列表
router.get('/list', require('../controller/app').getList)
// 新增
router.post('/add', require('../controller/app').postAdd)
// 详情
router.get('/detail', require('../controller/app').getDetail)
// 新增
router.post('/detele', require('../controller/app').postDetele)
// 修改
router.post('/modify', require('../controller/app').postModify)

module.exports = router
