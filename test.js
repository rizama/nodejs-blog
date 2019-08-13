const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', {
  useNewUrlParser: true
})

Post.create({
  title: "My Blog Title",
  description: "Blog post description",
  content: "Lorem ipsum dolor"
}, (error, post) => {
  console.log(error, post)
})