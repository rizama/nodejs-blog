const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', {
  useNewUrlParser: true
})

Post.find({}, (error, posts) => {
  console.log(posts)
})

// Post.create({
//   title: "My Second Blog Title",
//   description: "Second Blog post description",
//   content: "Lorem ipsum dolor"
// }, (error, post) => {
//   console.log(error, post)
// })