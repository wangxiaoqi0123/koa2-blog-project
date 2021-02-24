// 环境变量
const env = process.env.NODE_ENV

// 配置
let MONGODB_CONF
let REDIS_CONF

// 本地开发
if (env === 'dev') {
  // mongodb
  MONGODB_CONF = {
    url: 'mongodb://localhost:27017',
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

// 开发配置
if (env === 'production') {
  // mongodb
  MONGODB_CONF = {
    url: 'mongodb://localhost:27017',
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

module.exports = {
  MONGODB_CONF,
  REDIS_CONF
}