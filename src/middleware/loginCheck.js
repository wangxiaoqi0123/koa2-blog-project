const { ErrorModel } = require('../model/resModel');
const loginCheck = async function (ctx, next) {
  if (ctx.session.username) {
    await next()
    return
  } else {
    ctx.body = new ErrorModel('尚未登录')
  }
}

module.exports = loginCheck