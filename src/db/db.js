const mongoose = require('mongoose')
const { MONGODB_CONF } = require('../conf/db')
const { url, database } = MONGODB_CONF

// 执行连接
mongoose.connect(`${url}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// 创建连接对象
const db = mongoose.connection

// 异常监听处理
db.on('error', (err) => {
  console.error(err)
})

// 连接成功
// db.on('open', () => {
//   console.log('mongoose connect success')
// })

module.exports = mongoose
