const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')
const login = async (username, password) => {
  username = escape(username)
  password = genPassword(password)
  password = escape(password)
  let mql = `SELECT username,realname FROM users WHERE username=${username} AND \`password\`=${password}`
  const rows = await exec(mql)
  return rows[0]
}

module.exports = {
  login
}