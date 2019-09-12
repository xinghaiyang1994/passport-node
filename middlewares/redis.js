const Redis = require('ioredis')
const {
  redis
} = require('../config/default')
const {
  APP_NAME
} = require('../utils/const')

module.exports = new Redis(Object.assign({
  keyPrefix: APP_NAME
}, redis))