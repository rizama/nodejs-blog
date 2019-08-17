const mongoose = require('mongoose')

const Post = require('./database/models/Post')

// * Konek ke database mongodb
mongoose.connect('mongodb://localhost/node-js-test-blog', {
  useNewUrlParser: true
})

// * set False useFindAndModify agar bisa memakai findByIdAndUpdate dll
mongoose.set('useFindAndModify', false);

// * Ambil semua data pada database 
// Post.find({}, (error, posts) => {
//   console.log(posts)
// })

// * ambil satu data bedasarkan ID
Post.findById("5d52d848f501c26fb844e5d1", (error, post) => {
  console.log(error, post)
})

// * ambil data dan update dari database
Post.findByIdAndUpdate("5d52d848f501c26fb844e5d1", {
  title: 'My First Blog Edited Again'
}, (error, post) => {
  console.log(error, post)
})


// Post.create({
//   title: "My Second Blog Title",
//   description: "Second Blog post description",
//   content: "Lorem ipsum dolor"
// }, (error, post) => {
//   console.log(error, post)
// })