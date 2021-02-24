const router = require('koa-router')()
const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

router.prefix('/api/user')

router.post('/login', async (ctx, next) => {
  let { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    ctx.session.username = data.username
    ctx.session.realname = data.realname
    let { username, realname } = ctx.session
    ctx.body = new SuccessModel({ username, realname })
  } else {
    ctx.body = new ErrorModel('账号或密码错误')
  }
})
module.exports = router
