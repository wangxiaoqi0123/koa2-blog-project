const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const morgan = require('koa-morgan')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');
const fs = require('fs');
const { REDIS_CONF } = require('./src/conf/db')

const blog = require('./src/routes/blog')
const user = require('./src/routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())

// 日志
app.use(logger())

app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

let ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // logger
  app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
} else {
  let accessFileName = path.join(__dirname, 'logs', 'access.log')
  let sccessWriteStream = fs.createWriteStream(accessFileName, { flags: 'a' })
  app.use(morgan('combined', {
    stream: sccessWriteStream
  }))
}

// session redis
app.keys = ['wangxiaoqi0123']
app.use(session(
  {
    // 配置cookie
    cookie: {
      path: '/',
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000
    },
    // 配置redis
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
  }
))

// routes
app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
