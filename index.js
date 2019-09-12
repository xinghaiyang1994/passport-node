const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const helmet = require('koa-helmet')
const session = require('koa-session')
const redisStore = require('koa-redis')

const routes = require('./routes')
const { port, redis, redisSession } = require('./config/default')
const { logError } = require('./middlewares/log')

const app = new Koa()

// 提供安全 headers 
app.use(helmet())

// 支持跨域
app.use(cors({
  'credentials': true
}))

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 200
    ctx.body = {
      code: -1,
      message: err.message,
      data: ''
    }
    let errMsg = `${ctx.url} | ${err.message}`
    console.log(errMsg)
    logError.error(errMsg)
  }
})

// session 存入 redis
let store = redisStore(redis)
app.keys = redisSession.keys   // 秘钥
const sessionConfig = {    
  prefix: redisSession.prefix,        // redis 中 key 的前缀
  key: redisSession.key,    // cookie 的名称。默认为 koa:sess
  domain: redisSession.domain,
  store
}
app.use(session(sessionConfig, app))

// 解析 post
app.use(bodyParser({
  formLimit: '1mb'
}))

// 路由
routes(app)

// 无效 url 处理
app.use(ctx => {
  app.emit('error', '无效的 url', ctx)
})

app.listen(port, () => {
  console.log('http://localhost:' + port)
})