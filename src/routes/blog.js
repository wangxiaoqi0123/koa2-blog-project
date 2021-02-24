const router = require('koa-router')()
const { getList, getDetail, newBlog, undateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

// 登录列表校验
const adminChick = async function (ctx, next) {
  // 登陆admin
  if (ctx.query.admin) {
    // 登录校验
    if (!ctx.session.username) {
      ctx.body = new ErrorModel('尚未登录')
    } else {
      ctx.query.author = ctx.session.username
      await next()
    }
  } else {
    await next()
  }
}

// 获取博客列表
router.get('/list', adminChick, async (ctx, next) => {
  let author = ctx.query.author || ''
  let keyword = ctx.query.keyword || ''
  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
})

// 获取博客详情
router.get('/detail', async (ctx, next) => {
  const id = ctx.query.id || ''
  const data = await getDetail(id)
  ctx.body = new SuccessModel(data)
})

// 新建一篇博客
router.post('/new', loginCheck, async (ctx, next) => {
  let { content, title } = ctx.request.body
  let { username } = ctx.session
  const data = await newBlog({ content, title, author: username })
  ctx.body = new SuccessModel(data)
})

// 更新一篇博客
router.post('/update', loginCheck, async (ctx, next) => {
  let id = ctx.query.id
  let author = ctx.session.username
  let { content, title } = ctx.request.body
  let flag = await undateBlog(id, { title, content, author })
  if (flag) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

// 删除一篇博客
router.post('/del', loginCheck, async (ctx, next) => {
  let author = ctx.session.username
  let { id } = ctx.request.body
  const flag = await delBlog({ id, author })
  if (flag) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router
