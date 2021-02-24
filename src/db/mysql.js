const mysql = require('mysql');
const { MYSQL_CONF } = require('../conf/db');

// 创建连接对象
const db = mysql.createConnection(MYSQL_CONF)
// 开始连接
db.connect()

// 创建统一执行 sql 的函数
function exec(sql) {
  const p = new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return p
}

module.exports = {
  exec,
  escape: mysql.escape
}