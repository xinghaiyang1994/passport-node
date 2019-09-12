// 应用名称
const APP_NAME = 'PASSPORT'

// redis 前缀
const REDIS_PREFIX = {
  // 测试
  TEST: 'TEST'
}

for(let key in REDIS_PREFIX){
  REDIS_PREFIX[key] = `|${key}:`
}

module.exports = {
  APP_NAME,
  REDIS_PREFIX
}