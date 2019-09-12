const svgCaptcha = require('svg-captcha')
const validate = require('../utils/validate')
const { register, login } = require('../utils/joiSchema')
const { dealBody, md5 } = require('../utils/tools')
const { checkLogin } = require('../middlewares/check')
const {
  findUserByName,
  insertUser
} = require('../dao/user')

module.exports = {
  // 注册验证码
  async getRegisterCaptcha(ctx) {
    const captcha = svgCaptcha.create({
      ignoreChars: '0o1il'
    })
    ctx.session.registerCaptcha = captcha.text.toLowerCase()
    ctx.response.set('Content-Type', 'image/svg+xml')
    return ctx.body = String(captcha.data)
  },
  // 登录验证码
  async getLoginCaptcha(ctx) {
    const captcha = svgCaptcha.create({
      ignoreChars: '0o1il'
    })
    ctx.session.loginCaptcha = captcha.text.toLowerCase()
    ctx.response.set('Content-Type', 'image/svg+xml')
    return ctx.body = String(captcha.data)
  },
  // 注册
  async postRegister(ctx) {
    let { name, password, passwordAgain, captcha } = ctx.request.body
    name = name.trim()

    // 校验
    validate({ name, password, passwordAgain, captcha }, register)
    if (password !== passwordAgain) {
      throw new Error('两次密码不相同！')
    }
    if (captcha !== ctx.session.registerCaptcha) {
      throw new Error('验证码错误！')
    }
    let daoUser = await findUserByName(name) 
    if (daoUser) {
      throw new Error('用户名已存在！')
    }

    // 新增用户
    let daoNewUser = await insertUser({ name, password: md5(password) })
    let jsonNewUser = daoNewUser.toJSON()
    ctx.session.user = {
      id: jsonNewUser.id,
      name: jsonNewUser.name
    }
    return ctx.body = dealBody({
      data: {
        id: jsonNewUser.id
      },
      message: '注册成功'
    })
  },
  // 登录页
  async postLogin(ctx) {
    let { name, password, captcha } = ctx.request.body
    name = name.trim()

    // 校验
    validate({ name, password, captcha }, login)
    if (captcha !== ctx.session.loginCaptcha) {
      throw new Error('验证码错误！')
    }
    let daoUser = await findUserByName(name)
    if (!daoUser) {
      throw new Error('用户不存在！')
    } 
    let jsonUser = daoUser.toJSON()
    if (md5(password) !== jsonUser.password) {
      throw new Error('密码不正确！')
    }

    // 登录
    ctx.session.user = {
      id: jsonUser.id,
      name: jsonUser.name
    }
    return ctx.body = dealBody({
      message: '登录成功'
    })
  },
  // 获取用户信息
  async getInfo(ctx) {
    // 检查登录
    let loginData = checkLogin(ctx)
    if (!loginData.status) {
      return ctx.body = loginData.data
    }

    return ctx.body = dealBody({
      data: ctx.session.user
    })
  },
  // 退出
  async postLogout(ctx) {
    ctx.session.user = null
    return ctx.body = dealBody({
      message: '退出成功'
    })
  }
}