const Router = require('koa-router')
const router = new Router()

// 注册验证码
router.get('/registerCaptcha', require('../controller/user').getRegisterCaptcha)
// 登录验证码
router.get('/loginCaptcha', require('../controller/user').getLoginCaptcha)
// 注册
router.post('/register', require('../controller/user').postRegister)
// 登录
router.post('/login', require('../controller/user').postLogin)
// 获取用户信息
router.get('/info', require('../controller/user').getInfo)
// 退出
router.post('/logout', require('../controller/user').postLogout)

module.exports = router
