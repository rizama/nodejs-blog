// * Import Package
const express = require('express')
const path = require('path')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// * Create new Express
const app = new express()

// * Connect to Mongodb
mongoose.connect('mongodb://localhost/node-js-blog', {
  useNewUrlParser: true
})

// * Use Package
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// * Import Model 
const Post = require('./database/models/Post')

// * Index Route
// app.get('/', (req, res) => {
// console.log(`${__dirname}/views`)
//   res.render('index')
// })

// Index Route Use Asyncronous Function
app.get('/', async (req, res) => {
  const posts = await Post.find({})
  console.log(posts)
  res.render('index', {
    posts: posts
  })
})

// * About Route
app.get('/about', (req, res) => {
  res.render('about')
})

// * Contact Route
app.get('/contact', (req, res) => {
  res.render('contact')
})

// * Posts Route
app.get('/post/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)
  console.log(post)
  res.render('post', {
    post
  })
})

app.get('/post/new', (req, res) => {
  res.render('create')
})

app.post('/posts/store', (req, res) => {
  console.log(req.body)
  Post.create(req.body, (error, post) => {
    res.redirect('/')
  })
})

// * Server Run
app.listen(3000, () => {
  console.log('App Listening on port 3000')
})