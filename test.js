const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/node-js-test-blog', {
  useNewUrlParser: true
})

// Post.find({}, (error, posts) => {
//   console.log(posts)
// })

Post.findById("5d52d848f501c26fb844e5d1", (error, post) => {
  console.log(error, post)
})


// Post.create({
//   title: "My Second Blog Title",
//   description: "Second Blog post description",
//   content: "Lorem ipsum dolor"
// }, (error, post) => {
//   console.log(error, post)
// })