const User = require('../db/modules/User')
const { genPassword } = require('../utils/crypto')
const login = async (username, password) => {
  password = genPassword(password)
  const user = await User.findOne({
    username,
    password
  })

  return user || {}
}

module.exports = {
  login
}