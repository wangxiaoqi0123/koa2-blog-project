const Blog = require('../db/modules/Blog')
const xss = require('xss')
const getList = async (author, keyword) => {
  const whereOpt = {}
  author && (whereOpt.author = author)
  keyword && (whereOpt.content = new RegExp(keyword))
  const list = await Blog.find(whereOpt).sort({ _id: -1 })
  return list
}

const getDetail = async (id) => {
  const result = await Blog.findById(id)
  if (result) return result
  return {}
}

const newBlog = async (blogData = {}) => {
  let { title, content, author } = blogData
  title = xss(title)
  content = xss(content)
  const result = await Blog.create({
    title,
    content,
    author
  })
  return { _id: result._id }
}

const undateBlog = async (id, blogData = {}) => {
  let { title, content, author } = blogData
  const result = await Blog.findOneAndUpdate(
    {
      _id: id,
      author
    },
    {
      title,
      content
    }
  )
  return result
}

const delBlog = async (blogData = {}) => {
  let { id, author } = blogData
  const result = await Blog.findOneAndDelete({ _id: id, author })
  return result
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  undateBlog,
  delBlog
}