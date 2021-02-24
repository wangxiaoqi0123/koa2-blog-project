const { exec } = require('../db/mysql')
const xss = require('xss')
const getList = async (author, keyword) => {
  let sql = `SELECT * FROM blogs WHERE 1=1 `
  if (author) {
    sql += `AND author="${author}" `
  }
  if (keyword) {
    sql += `AND content LIKE "%${keyword}%" `
  }
  sql += `ORDER BY createtime DESC`
  return await exec(sql)
}

const getDetail = async (id) => {
  let sql = `SELECT * FROM blogs WHERE id=${id || -1}`
  const data = await exec(sql)
  if (data && data.length > 0) {
    return data[0]
  } else {
    return {}
  }
}

const newBlog = async (blogData = {}) => {
  let { title, content, author } = blogData
  title = xss(title)
  let createtime = Date.now()
  let sql = `INSERT INTO blogs (title,content,createtime,author) VALUES ('${title}','${content}',${createtime},'${author}')`
  const data = await exec(sql)
  return { id: data.insertId }
}

const undateBlog = async (id, blogData = {}) => {
  let { title, content, author } = blogData
  let createtime = Date.now()
  let sql = `UPDATE blogs SET title='${title}',content='${content}',createtime='${createtime}',author='${author}' WHERE id=${id}`
  const updateData = await exec(sql)
  return updateData.affectedRows > 0
}

const delBlog = async (blogData = {}) => {
  let { id, author } = blogData
  let sql = `DELETE FROM blogs WHERE id=${id} AND author='${author}'`
  const delData = await exec(sql)
  return delData.affectedRows > 0
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  undateBlog,
  delBlog
}