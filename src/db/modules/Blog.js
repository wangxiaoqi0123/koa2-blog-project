const { model } = require('mongoose')
const mongoose = require('../db')

// 定义数据格式
const BlogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Blog = mongoose.model('blog', BlogSchema)

module.exports = Blog