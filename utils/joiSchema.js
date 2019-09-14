// 所有格式校验
const Joi = require('joi')

module.exports = {
  // 注册
  register: {
    name: Joi.string().max(20).required(),
    password: Joi.string().max(20).required(),
    passwordAgain: Joi.string().max(20).required(),
    captcha: Joi.string().length(4).required()
  },
  // 登录
  login: {
    name: Joi.string().max(20).required(),
    password: Joi.string().max(20).required(),
    captcha: Joi.string().length(4).required()
  },
  // app
  app: {
    name: Joi.string().max(20).required(),
    code: Joi.string().max(20).required()
  },
}